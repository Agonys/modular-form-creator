import type { PaginationInfo } from '@/types/resource'

export interface PaginationProps {
  pagination: PaginationInfo
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}
