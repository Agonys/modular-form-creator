import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button, Badge } from '@/design-system'
import { StatusBadge } from '@/components'
import { getResource } from '@/api/resources'
import { isBasicInfoComplete, isProjectDetailsComplete } from '@/utils'
import { useBufferedEdits } from '@/context/BufferedEditsContext'
import type { Resource } from '@/types/resource'
import {
  PageWrapper,
  PageHeader,
  PageSubtitle,
  DetailsGrid,
  DetailCard,
  DetailCardTitle,
  DetailField,
  DetailLabel,
  DetailValue,
  OptionsList,
  LoadingText,
  NotFoundWrapper,
  UnsavedBanner,
} from './ResourceDetailsPage.styles'

export function ResourceDetailsPage() {
  const navigate = useNavigate()
  const { resourceId } = useParams<{ resourceId: string }>()
  const { state, hasChanges } = useBufferedEdits()

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

  if (isLoading) {
    return <LoadingText>Loading details...</LoadingText>
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
  const isCompleted = resource.status === 'completed'

  const displayBasicInfo =
    isCompleted && state.basicInfo
      ? { ...resource.basicInfo, ...state.basicInfo }
      : resource.basicInfo

  const displayProjectDetails =
    isCompleted && state.projectDetails
      ? { ...resource.projectDetails, ...state.projectDetails }
      : resource.projectDetails

  return (
    <PageWrapper>
      <PageHeader>
        <h1>Resource Details</h1>
        <PageSubtitle>
          Complete overview of all module data for this resource.
        </PageSubtitle>
      </PageHeader>

      <div
        style={{
          marginBottom: '16px',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <StatusBadge status={resource.status} />
      </div>

      {isCompleted && hasChanges && (
        <UnsavedBanner>
          You have unsaved changes. Navigate to the module forms to review, or save from
          the overview page.
        </UnsavedBanner>
      )}

      <DetailsGrid>
        <DetailCard>
          <DetailCardTitle>
            Basic Info
            <Badge variant={basicComplete ? 'success' : 'neutral'}>
              {basicComplete ? 'Complete' : 'Incomplete'}
            </Badge>
          </DetailCardTitle>

          <DetailField>
            <DetailLabel>Resource Name</DetailLabel>
            <DetailValue>{displayBasicInfo.resourceName || '—'}</DetailValue>
          </DetailField>

          <DetailField>
            <DetailLabel>Owner</DetailLabel>
            <DetailValue>{displayBasicInfo.owner || '—'}</DetailValue>
          </DetailField>

          <DetailField>
            <DetailLabel>Email</DetailLabel>
            <DetailValue>{displayBasicInfo.email || '—'}</DetailValue>
          </DetailField>

          <DetailField>
            <DetailLabel>Priority</DetailLabel>
            <DetailValue>{displayBasicInfo.priority || '—'}</DetailValue>
          </DetailField>

          <DetailField>
            <DetailLabel>Description</DetailLabel>
            <DetailValue>{displayBasicInfo.description || '—'}</DetailValue>
          </DetailField>
        </DetailCard>

        <DetailCard>
          <DetailCardTitle>
            Project Details
            <Badge variant={projectComplete ? 'success' : 'neutral'}>
              {projectComplete ? 'Complete' : 'Incomplete'}
            </Badge>
          </DetailCardTitle>

          <DetailField>
            <DetailLabel>Project Name</DetailLabel>
            <DetailValue>{displayProjectDetails.projectName || '—'}</DetailValue>
          </DetailField>

          <DetailField>
            <DetailLabel>Budget</DetailLabel>
            <DetailValue>
              {displayProjectDetails.budget ? `$${displayProjectDetails.budget}` : '—'}
            </DetailValue>
          </DetailField>

          <DetailField>
            <DetailLabel>Category</DetailLabel>
            <DetailValue>{displayProjectDetails.category || '—'}</DetailValue>
          </DetailField>

          <DetailField>
            <DetailLabel>Team Members</DetailLabel>
            <OptionsList>
              {displayProjectDetails.options.map((option) => (
                <Badge key={option} variant="info">
                  {option}
                </Badge>
              ))}
            </OptionsList>
          </DetailField>
        </DetailCard>
      </DetailsGrid>
    </PageWrapper>
  )
}
