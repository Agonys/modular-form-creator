import type { Resource } from '@/types/resource'
import { isBasicInfoComplete, isProjectDetailsComplete } from '@/utils'

export function getModuleCount(resource: Resource): number {
  let count = 0
  if (isBasicInfoComplete(resource.basicInfo)) count++
  if (isProjectDetailsComplete(resource.projectDetails)) count++
  return count
}
