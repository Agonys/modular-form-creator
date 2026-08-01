export type ResourceStatus = 'draft' | 'completed'

export type Priority = 'low' | 'medium' | 'high'
export type ProjectCategory = 'internal' | 'external' | 'vendor'
export type TeamMember = 'FE devs' | 'BE devs' | 'Designer' | 'Data Eng' | 'Product Owner'

export interface BasicInfo {
  resourceName: string
  owner: string
  email: string
  description: string
  priority: Priority
}

export interface ProjectDetails {
  projectName: string
  budget: string
  category: ProjectCategory
  options: TeamMember[]
}

export interface Resource {
  _id: string
  resourceId: number
  name: string
  status: ResourceStatus
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
  createdAt: string
  updatedAt: string
}

export interface ResourcePayload {
  name: string
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
}

export interface ListResourcesParams {
  page?: number
  pageSize?: number
  status?: ResourceStatus
  name?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginationInfo {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface ListResourcesResponse {
  items: Resource[]
  pagination: PaginationInfo
}

export interface CreateResourceInput {
  resourceName: string
}

export interface ApiError {
  message: string
  details: unknown
}
