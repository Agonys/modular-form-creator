import { apiClient } from './client'
import type {
  Resource,
  ListResourcesResponse,
  ListResourcesParams,
  CreateResourceInput,
  BasicInfo,
  ProjectDetails,
  ResourcePayload,
} from '../types/resource'

export function listResources(params: ListResourcesParams = {}) {
  const search = new URLSearchParams()
  if (params.page) search.set('page', String(params.page))
  if (params.pageSize) search.set('pageSize', String(params.pageSize))
  if (params.status) search.set('status', params.status)
  if (params.name) search.set('name', params.name)
  if (params.sortOrder) search.set('sortOrder', params.sortOrder)
  const query = search.toString()
  return apiClient.get<ListResourcesResponse>(`/resources${query ? `?${query}` : ''}`)
}

export function createResource(input: CreateResourceInput) {
  return apiClient.post<Resource>('/resources', input)
}

export function getResource(id: string | number) {
  return apiClient.get<Resource>(`/resources/${id}`)
}

export function deleteResource(id: string | number) {
  return apiClient.delete<Resource>(`/resources/${id}`)
}

export function updateBasicInfo(id: string | number, data: BasicInfo) {
  return apiClient.patch<Resource>(`/resources/${id}/basic-info`, data)
}

export function updateProjectDetails(id: string | number, data: ProjectDetails) {
  return apiClient.patch<Resource>(`/resources/${id}/project-details`, data)
}

export function provisionResource(id: string | number) {
  return apiClient.patch<Resource>(`/resources/${id}/provisioning`, {})
}

export function updateCompletedResource(id: string | number, data: ResourcePayload) {
  return apiClient.put<Resource>(`/resources/${id}`, data)
}
