export interface ModuleFormProps {
  title: string
  subtitle: string
  isLoading: boolean
  isError: boolean
  isLocked: boolean
  hasUnsavedChanges: boolean
  isSubmitting: boolean
  isDirty: boolean
  onDiscard: () => void
  onSubmit: () => void
  lockedMessage?: string
  lockedActionLabel?: string
  onLockedAction?: () => void
  children: React.ReactNode
}
