import { Input, Select } from '@/design-system'
import { ModuleForm, FormField } from '@/components/ModuleForm'
import { useModuleForm } from '@/hooks/useModuleForm'
import { basicInfoSchema } from '@/schemas/basicInfo.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Priority, Resource } from '@/types/resource'
import { PRIORITY_OPTIONS } from '@/constants'

export function BasicInfoPage() {
  const {
    resource,
    isLoading,
    isError,
    form: {
      register,
      formState: { errors, isDirty },
    },
    isSubmitting,
    hasUnsavedChanges,
    onSubmit,
    handleDiscard,
  } = useModuleForm({
    moduleType: 'basicInfo',
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      resourceName: '',
      owner: '',
      email: '',
      description: '',
      priority: 'low' as const,
    },
    getValuesFromResource: (r: Resource) => ({
      resourceName: r.basicInfo.resourceName,
      owner: r.basicInfo.owner,
      email: r.basicInfo.email,
      description: r.basicInfo.description,
      priority: (r.basicInfo.priority as Priority) || 'low',
    }),
    getBufferedData: (values) => ({
      owner: values.owner,
      email: values.email,
      description: values.description,
      priority: values.priority,
    }),
  })

  return (
    <ModuleForm
      title="Basic Info"
      subtitle="Owner, contact information, and priority level."
      isLoading={isLoading}
      isError={isError}
      isLocked={false}
      hasUnsavedChanges={hasUnsavedChanges}
      isSubmitting={isSubmitting}
      isDirty={isDirty}
      onDiscard={handleDiscard}
      onSubmit={onSubmit}
    >
      <FormField>
        <Input
          label="Resource Name"
          value={resource?.basicInfo.resourceName ?? ''}
          state="locked"
          readOnly
          helperText="Fixed after creation"
        />
      </FormField>

      <FormField>
        <Input
          label="Owner"
          placeholder="Enter owner name..."
          error={errors.owner?.message}
          {...register('owner')}
        />
      </FormField>

      <FormField>
        <Input
          label="Email"
          type="email"
          placeholder="owner@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </FormField>

      <FormField>
        <Select
          label="Priority Level"
          options={PRIORITY_OPTIONS}
          error={errors.priority?.message}
          {...register('priority')}
        />
      </FormField>

      <FormField>
        <Input
          label="Description"
          placeholder="What is this resource for?"
          multiline
          rows={4}
          error={errors.description?.message}
          {...register('description')}
        />
      </FormField>
    </ModuleForm>
  )
}
