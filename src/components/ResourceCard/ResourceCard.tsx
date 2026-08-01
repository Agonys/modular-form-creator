import { Badge, Card, IconButton } from '@/design-system'
import { StatusBadge } from '@/components'
import { isBasicInfoComplete, isProjectDetailsComplete, formatDate } from '@/utils'
import {
  CardHeader,
  ResourceName,
  ModuleProgress,
  CardFooter,
  MetaText,
  Actions,
} from './ResourceCard.styles'
import type { ResourceCardProps } from './ResourceCard.model'

export function ResourceCard({ resource, onDelete, onNavigate }: ResourceCardProps) {
  const basicDone = isBasicInfoComplete(resource.basicInfo)
  const projectDone = isProjectDetailsComplete(resource.projectDetails)

  return (
    <Card variant="outline">
      <CardHeader>
        <ResourceName onClick={() => onNavigate(resource.resourceId)}>
          {resource.name}
        </ResourceName>
        <StatusBadge status={resource.status} />
      </CardHeader>

      <ModuleProgress>
        <Badge>Basic Info {basicDone ? '✓' : '—'}</Badge>
        <Badge>Project Details {projectDone ? '✓' : '—'}</Badge>
      </ModuleProgress>

      <CardFooter>
        <MetaText>Created {formatDate(resource.createdAt)}</MetaText>
        <Actions>
          <IconButton
            variant="ghost"
            size="small"
            onClick={() => onNavigate(resource.resourceId)}
          >
            View
          </IconButton>
          <IconButton
            variant="ghost"
            size="small"
            state="disabled"
            onClick={() => onDelete(resource.resourceId)}
          >
            Delete
          </IconButton>
        </Actions>
      </CardFooter>
    </Card>
  )
}
