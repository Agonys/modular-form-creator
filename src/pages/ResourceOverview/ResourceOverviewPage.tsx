import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  LayoutDashboard,
  Rocket,
  Check,
  Package,
  Lock,
  Info,
  ChevronRight,
  ClipboardList,
} from 'lucide-react'
import { Button } from '@/design-system'
import { StatusBadge } from '@/components'
import { getResource, provisionResource, updateCompletedResource } from '@/api/resources'
import {
  isBasicInfoComplete,
  isProjectDetailsComplete,
  formatDate,
  notify,
} from '@/utils'
import { useBufferedEdits } from '@/context/BufferedEditsContext'
import type { Resource } from '@/types/resource'
import {
  PageWrapper,
  PageHeader,
  HeaderLeft,
  ResourceMeta,
  HeaderActions,
  SectionLabel,
  ModuleList,
  ModuleCard,
  ModuleIcon,
  ModuleInfo,
  ModuleTitle,
  ModuleDescription,
  ModuleStatus,
  StatusText,
  InfoBanner,
  InfoBannerTitle,
  InfoBannerText,
  SuccessBanner,
  LoadingText,
  NotFoundWrapper,
} from './ResourceOverviewPage.styles'

export function ResourceOverviewPage() {
  const navigate = useNavigate()
  const { resourceId } = useParams<{ resourceId: string }>()
  const queryClient = useQueryClient()
  const { state, clearBuffer, hasChanges } = useBufferedEdits()

  const {
    data: resource,
    isLoading,
    isError,
  } = useQuery<Resource>({
    queryKey: ['resource', resourceId],
    queryFn: () => {
      if (!resourceId) throw new Error('Resource ID is required')
      return getResource(resourceId)
    },
    enabled: !!resourceId,
  })

  const provisionMutation = useMutation({
    mutationFn: () => {
      if (!resourceId) throw new Error('Resource ID is required')
      return provisionResource(resourceId)
    },
    onSuccess: (updatedResource) => {
      queryClient.setQueryData(['resource', resourceId], updatedResource)
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      notify({ type: 'success', message: 'Resource provisioned successfully' })
    },
    onError: (error: Error) => {
      notify({ type: 'error', message: error.message || 'Failed to provision resource' })
    },
  })

  const saveMutation = useMutation({
    mutationFn: () => {
      if (!resourceId || !resource) throw new Error('Resource not loaded')
      return updateCompletedResource(resourceId, {
        name: resource.name,
        basicInfo: { ...resource.basicInfo, ...state.basicInfo },
        projectDetails: { ...resource.projectDetails, ...state.projectDetails },
      })
    },
    onSuccess: (updatedResource) => {
      queryClient.setQueryData(['resource', resourceId], updatedResource)
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      clearBuffer()
      notify({ type: 'success', message: 'Changes saved successfully' })
    },
    onError: (error: Error) => {
      notify({ type: 'error', message: error.message || 'Failed to save changes' })
    },
  })

  if (isLoading) {
    return <LoadingText>Loading resource...</LoadingText>
  }

  if (isError || !resource) {
    return (
      <NotFoundWrapper>
        <p>Resource not found.</p>
        <Button variant="secondary" onClick={() => navigate('/resources')}>
          Back to Resources
        </Button>
      </NotFoundWrapper>
    )
  }

  const basicComplete = isBasicInfoComplete(resource.basicInfo)
  const projectComplete = isProjectDetailsComplete(resource.projectDetails)
  const canProvision = basicComplete && projectComplete && resource.status === 'draft'
  const isCompleted = resource.status === 'completed'

  return (
    <PageWrapper>
      <PageHeader>
        <HeaderLeft>
          <h1>
            {resource.name}
            <StatusBadge status={resource.status} />
          </h1>
          <ResourceMeta>
            Resource ID: {resource.resourceId} &middot; Created{' '}
            {formatDate(resource.createdAt)}
          </ResourceMeta>
        </HeaderLeft>
        <HeaderActions>
          {isCompleted && hasChanges && (
            <Button
              variant="primary"
              size="small"
              disabled={saveMutation.isPending}
              onClick={() => saveMutation.mutate()}
            >
              <Check size={14} /> Save Changes
            </Button>
          )}
          <Button
            variant="secondary"
            size="small"
            onClick={() => navigate(`/resources/${resourceId}/details`)}
          >
            <LayoutDashboard size={14} /> Summary View
          </Button>
          {!isCompleted && (
            <Button
              variant="primary"
              size="small"
              disabled={!canProvision || provisionMutation.isPending}
              onClick={() => provisionMutation.mutate()}
            >
              <Rocket size={14} /> Provision Resource
            </Button>
          )}
        </HeaderActions>
      </PageHeader>

      <SectionLabel>Module Progress</SectionLabel>

      <ModuleList>
        <ModuleCard onClick={() => navigate(`/resources/${resourceId}/basic-info`)}>
          <ModuleIcon $complete={basicComplete}>
            {basicComplete ? <Check size={18} /> : <ClipboardList size={18} />}
          </ModuleIcon>
          <ModuleInfo>
            <ModuleTitle>Basic Info</ModuleTitle>
            <ModuleDescription>
              Owner, contact information, and priority level.
            </ModuleDescription>
          </ModuleInfo>
          <ModuleStatus>
            <StatusText $complete={basicComplete}>
              {basicComplete ? 'Completed' : 'Incomplete'}
            </StatusText>
            <ChevronRight size={16} />
          </ModuleStatus>
        </ModuleCard>

        <ModuleCard
          $locked={resource.status === 'draft' && !basicComplete}
          onClick={() => {
            if (resource.status === 'draft' && !basicComplete) return
            navigate(`/resources/${resourceId}/project-details`)
          }}
        >
          <ModuleIcon $complete={projectComplete}>
            {projectComplete ? (
              <Check size={18} />
            ) : resource.status === 'draft' && !basicComplete ? (
              <Lock size={16} />
            ) : (
              <Package size={18} />
            )}
          </ModuleIcon>
          <ModuleInfo>
            <ModuleTitle>Project Details</ModuleTitle>
            <ModuleDescription>
              Allocation, budget, and team access configuration.
            </ModuleDescription>
          </ModuleInfo>
          <ModuleStatus>
            <StatusText $complete={projectComplete}>
              {projectComplete ? 'Completed' : 'Incomplete'}
            </StatusText>
            <ChevronRight size={16} />
          </ModuleStatus>
        </ModuleCard>
      </ModuleList>

      {isCompleted ? (
        <SuccessBanner>
          <Info size={18} />
          <div>
            <InfoBannerTitle>Resource Completed</InfoBannerTitle>
            <InfoBannerText>
              This resource has been fully provisioned. All modules are complete and the
              resource is in its final state.
            </InfoBannerText>
          </div>
        </SuccessBanner>
      ) : (
        <InfoBanner>
          <Info size={18} />
          <div>
            <InfoBannerTitle>Provisioning Prerequisites</InfoBannerTitle>
            <InfoBannerText>
              Both Basic Info and Project Details must be fully completed before this
              resource can be moved to the <em>Completed</em> state via provisioning.
            </InfoBannerText>
          </div>
        </InfoBanner>
      )}
    </PageWrapper>
  )
}
