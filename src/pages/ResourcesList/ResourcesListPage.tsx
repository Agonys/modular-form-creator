import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { Button, Card, Input, Select } from '@/design-system'
import {
  StatusBadge,
  ConfirmDialog,
  CreateResourceDialog,
  Pagination,
} from '@/components'
import { listResources, createResource, deleteResource } from '@/api/resources'
import { formatDate, getModuleCount, notify } from '@/utils'
import { useDebounce } from '@/hooks/useDebounce'
import type { ResourceStatus, Resource } from '@/types/resource'
import {
  PageWrapper,
  PageHeader,
  HeaderLeft,
  Subtitle,
  Filters,
  Table,
  TableRow,
  ProgressCell,
  ProgressBar,
  ProgressFill,
  ProgressText,
  DeleteButton,
  EmptyState,
  PaginationWrapper,
} from './ResourcesListPage.styles'

export function ResourcesListPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [status, setStatus] = useState<ResourceStatus | undefined>(undefined)
  const [name, setName] = useState('')
  const [debouncedName, setDebouncedName] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)

  const debouncedSetName = useDebounce((value: string) => {
    setDebouncedName(value)
    setPage(1)
  }, 400)

  const { data, isLoading } = useQuery({
    queryKey: ['resources', { page, pageSize, status, name: debouncedName, sortOrder }],
    queryFn: () =>
      listResources({ page, pageSize, status, name: debouncedName, sortOrder }),
    placeholderData: keepPreviousData,
  })

  const createResourceMutation = useMutation({
    mutationFn: (resourceName: string) => createResource({ resourceName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      setCreateOpen(false)
    },
    onError: (err) => {
      notify({ type: 'error', message: err.message })
    },
  })

  const deleteResourceMutation = useMutation({
    mutationFn: (id: number) => deleteResource(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      setDeleteTarget(null)
    },
    onError: (err) => {
      notify({ type: 'error', message: err.message })
    },
  })

  const confirmDeleteResource = () => {
    if (!deleteTarget) return
    deleteResourceMutation.mutate(deleteTarget)
    setDeleteTarget(null)
  }

  return (
    <PageWrapper>
      <PageHeader>
        <HeaderLeft>
          <h1>Resources</h1>
          <Subtitle>
            Manage your modular resources and track their provisioning lifecycle.
          </Subtitle>
        </HeaderLeft>
        <Button variant="primary" onClick={() => setCreateOpen(true)}>
          New Resource
        </Button>
      </PageHeader>

      <Filters onSubmit={(e: SubmitEvent) => e.preventDefault()}>
        <Input
          placeholder="Search by name..."
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            debouncedSetName(e.target.value)
          }}
        />
        <Select
          label="Status"
          options={[
            { label: 'All', value: '' },
            { label: 'Draft', value: 'draft' },
            { label: 'Completed', value: 'completed' },
          ]}
          value={status ?? ''}
          onChange={(e) => {
            setStatus(e.target.value as ResourceStatus | undefined)
            setPage(1)
          }}
        />
        <Select
          label="Sort"
          options={[
            { label: 'Newest first', value: 'desc' },
            { label: 'Oldest first', value: 'asc' },
          ]}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        />
      </Filters>

      <Card variant="elevated">
        {isLoading ? (
          <EmptyState>
            <p>Loading resources...</p>
          </EmptyState>
        ) : data?.items.length === 0 ? (
          <EmptyState>
            <p>No resources found.</p>
            <Button variant="primary" onClick={() => setCreateOpen(true)}>
              Create your first resource
            </Button>
          </EmptyState>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Resource Name</th>
                <th>Status</th>
                <th>Module Progress</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((resource: Resource) => {
                const completed = getModuleCount(resource)
                const progress = completed / 2
                return (
                  <TableRow
                    key={resource.resourceId}
                    onClick={() => navigate(`/resources/${resource.resourceId}`)}
                  >
                    <td className="name">{resource.name}</td>
                    <td>
                      <StatusBadge status={resource.status} />
                    </td>
                    <td>
                      <ProgressCell>
                        <ProgressBar>
                          <ProgressFill
                            $progress={progress}
                            $complete={completed === 2}
                          />
                        </ProgressBar>
                        <ProgressText>{completed}/2 modules</ProgressText>
                      </ProgressCell>
                    </td>
                    <td className="date">{formatDate(resource.createdAt)}</td>
                    <td>
                      <DeleteButton
                        onClick={(e) => {
                          e.stopPropagation()
                          setDeleteTarget(resource.resourceId)
                        }}
                      >
                        <Trash2 size={16} />
                      </DeleteButton>
                    </td>
                  </TableRow>
                )
              })}
            </tbody>
          </Table>
        )}
      </Card>

      {data && !isLoading && (
        <PaginationWrapper>
          <Pagination
            pagination={data.pagination}
            onPageChange={setPage}
            onPageSizeChange={(newSize: number) => {
              setPageSize(newSize)
              setPage(1)
            }}
          />
        </PaginationWrapper>
      )}

      <CreateResourceDialog
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(name: string) => createResourceMutation.mutate(name)}
      />

      <ConfirmDialog
        title="Delete Resource"
        message="Are you sure you want to delete this resource? This action cannot be undone."
        confirmLabel="Delete"
        isOpen={deleteTarget !== null}
        onConfirm={confirmDeleteResource}
        onCancel={() => setDeleteTarget(null)}
      />
    </PageWrapper>
  )
}
