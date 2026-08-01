import { useNavigate, useParams } from 'react-router-dom'
import { Input, Select, CheckboxGroup } from '@/design-system'
import { ModuleForm, FormField } from '@/components/ModuleForm'
import { useModuleForm } from '@/hooks/useModuleForm'
import { projectDetailsSchema } from '@/schemas/projectDetails.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { isBasicInfoComplete } from '@/utils'
import type { Resource, TeamMember } from '@/types/resource'
import { CATEGORY_OPTIONS, TEAM_MEMBER_VALUES } from '@/constants'

export function ProjectDetailsPage() {
  const navigate = useNavigate()
  const { resourceId } = useParams<{ resourceId: string }>()

  const {
    resource,
    isLoading,
    isError,
    form,
    isSubmitting,
    hasUnsavedChanges,
    onSubmit,
    handleDiscard,
  } = useModuleForm({
    moduleType: 'projectDetails',
    resolver: zodResolver(projectDetailsSchema),
    defaultValues: {
      projectName: '',
      budget: '',
      category: 'internal',
      options: [],
    },
    getValuesFromResource: (r: Resource) => ({
      projectName: r.projectDetails.projectName,
      budget: r.projectDetails.budget,
      category:
        (r.projectDetails.category as 'internal' | 'external' | 'vendor') || 'internal',
      options: r.projectDetails.options as TeamMember[],
    }),
    getBufferedData: (values) => ({
      projectName: values.projectName,
      budget: values.budget,
      category: values.category,
      options: values.options,
    }),
  })

  const {
    watch,
    formState: { isDirty, errors },
    register,
    setValue,
  } = form
  const selectedOptions = watch('options') || []
  const basicComplete = resource ? isBasicInfoComplete(resource.basicInfo) : false
  const isLocked = resource?.status === 'draft' && !basicComplete

  return (
    <ModuleForm
      title="Project Details"
      subtitle="Allocation, budget, and team access configuration."
      isLoading={isLoading}
      isError={isError}
      isLocked={!!isLocked}
      hasUnsavedChanges={hasUnsavedChanges}
      isSubmitting={isSubmitting}
      isDirty={isDirty}
      onDiscard={handleDiscard}
      onSubmit={onSubmit}
      lockedMessage="Complete Basic Info first to unlock this module."
      lockedActionLabel="Go to Basic Info"
      onLockedAction={() => navigate(`/resources/${resourceId}/basic-info`)}
    >
      <FormField>
        <Input
          label="Project Name"
          placeholder="Enter project name..."
          error={errors.projectName?.message}
          {...register('projectName')}
        />
      </FormField>

      <FormField>
        <Input
          label="Budget"
          placeholder="Enter budget amount..."
          error={errors.budget?.message}
          helperText="Numbers only"
          {...register('budget')}
        />
      </FormField>

      <FormField>
        <Select
          label="Category"
          options={CATEGORY_OPTIONS}
          error={errors.category?.message}
          {...register('category')}
        />
      </FormField>

      <FormField>
        <CheckboxGroup
          label="Team Members"
          options={[...TEAM_MEMBER_VALUES]}
          value={selectedOptions}
          onChange={(next) =>
            setValue('options', next as (typeof TEAM_MEMBER_VALUES)[number][], {
              shouldValidate: true,
            })
          }
          error={errors.options?.message}
          helper="Select at least one team member"
        />
      </FormField>
    </ModuleForm>
  )
}
