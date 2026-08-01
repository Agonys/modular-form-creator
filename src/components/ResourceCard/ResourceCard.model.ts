import type { Resource } from '@/types/resource'

export interface ResourceCardProps {
  resource: Resource
  onDelete: (id: number) => void
  onNavigate: (id: number) => void
}
