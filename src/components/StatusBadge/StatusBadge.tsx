import { Badge } from '@/design-system'
import type { BadgeVariant } from '@/design-system'
import type { ResourceStatus } from '@/types/resource'

interface StatusBadgeProps {
  status: ResourceStatus
}

const statusConfig: Record<ResourceStatus, { variant: BadgeVariant; label: string }> = {
  draft: { variant: 'warning', label: 'Draft' },
  completed: { variant: 'success', label: 'Completed' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { variant, label } = statusConfig[status]
  return <Badge variant={variant}>{label}</Badge>
}
