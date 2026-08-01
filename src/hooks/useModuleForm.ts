import { useEffect, useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useForm,
  type FieldValues,
  type DefaultValues,
  type Resolver,
} from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useBufferedEdits } from '@/context/BufferedEditsContext'
import { getResource, updateBasicInfo, updateProjectDetails } from '@/api/resources'
import { notify } from '@/utils'
import type { Resource, BasicInfo, ProjectDetails } from '@/types/resource'

type ModuleType = 'basicInfo' | 'projectDetails'

interface UseModuleFormOptions<T extends FieldValues> {
  moduleType: ModuleType
  resolver: Resolver<T>
  defaultValues: DefaultValues<T>
  getValuesFromResource: (resource: Resource) => T
  getBufferedData: (values: T) => Partial<BasicInfo> | Partial<ProjectDetails>
}

export function useModuleForm<T extends FieldValues>({
  moduleType,
  resolver,
  defaultValues,
  getValuesFromResource,
  getBufferedData,
}: UseModuleFormOptions<T>) {
  const navigate = useNavigate()
  const { resourceId } = useParams<{ resourceId: string }>()
  const queryClient = useQueryClient()
  const { state, bufferBasicInfo, bufferProjectDetails } = useBufferedEdits()

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

  const isCompleted = resource?.status === 'completed'

  const form = useForm<T>({
    resolver,
    defaultValues,
  })

  const { reset, handleSubmit, formState } = form

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (resource) {
      const values = getValuesFromResource(resource)
      if (isCompleted) {
        const merged = {
          ...values,
          ...(state.basicInfo ?? {}),
          ...(state.projectDetails ?? {}),
        }
        reset(merged as T)
      } else {
        reset(values)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, reset])

  const draftMutation = useMutation({
    mutationFn: (data: T) => {
      if (!resourceId) throw new Error('Resource ID is required')

      if (moduleType === 'basicInfo') {
        return updateBasicInfo(resourceId, data as unknown as BasicInfo)
      }
      return updateProjectDetails(resourceId, data as unknown as ProjectDetails)
    },
    onMutate: () => setIsSubmitting(true),
    onSuccess: (updatedResource) => {
      queryClient.setQueryData(['resource', resourceId], updatedResource)
      queryClient.invalidateQueries({ queryKey: ['resources'] })
      notify({ type: 'success', message: `${moduleType} module saved successfully` })
      navigate(`/resources/${resourceId}`)
    },
    onError: (err) => {
      notify({
        type: 'error',
        message: err.message || `Failed to save ${moduleType} module`,
      })
    },
    onSettled: () => setIsSubmitting(false),
  })

  const onSubmit = useCallback(
    (data: T) => {
      if (isCompleted) {
        const bufferedData = getBufferedData(data)
        if (moduleType === 'basicInfo') {
          bufferBasicInfo(bufferedData as Partial<BasicInfo>)
        } else {
          bufferProjectDetails(bufferedData as Partial<ProjectDetails>)
        }
        notify({ type: 'success', message: 'Changes saved to local state' })
        navigate(`/resources/${resourceId}`)
      } else {
        draftMutation.mutate(data)
      }
    },
    [
      isCompleted,
      moduleType,
      bufferBasicInfo,
      bufferProjectDetails,
      draftMutation,
      getBufferedData,
      resourceId,
      navigate,
    ],
  )

  const handleDiscard = useCallback(() => {
    if (resource) {
      reset(getValuesFromResource(resource))
    }
  }, [resource, reset, getValuesFromResource])

  const isDirty = Object.keys(formState.dirtyFields).length > 0

  return {
    resource,
    isLoading,
    isError,
    form,
    isCompleted,
    isSubmitting,
    hasUnsavedChanges: isCompleted ? isDirty : false,
    onSubmit: handleSubmit(onSubmit),
    handleDiscard,
  }
}
