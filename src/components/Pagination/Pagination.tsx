import { Button, Select } from '@/design-system'
import {
  PaginationWrapper,
  PageSizeSelect,
  PageInfo,
  PageButtons,
} from './Pagination.styles'
import type { PaginationProps } from './Pagination.model'

export function Pagination({
  pagination,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const { page, pageSize, totalItems, totalPages } = pagination

  return (
    <PaginationWrapper>
      <PageSizeSelect>
        <Select
          label="Per page"
          options={[
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '25', value: '25' },
            { label: '50', value: '50' },
          ]}
          value={String(pageSize)}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        />
      </PageSizeSelect>

      <PageInfo>
        Page {page} of {totalPages} ({totalItems} total)
      </PageInfo>

      <PageButtons>
        <Button
          variant="secondary"
          size="small"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="small"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </PageButtons>
    </PaginationWrapper>
  )
}
