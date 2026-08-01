import { useNavigate } from 'react-router-dom'
import { Button, Card } from '@/design-system'
import {
  PageWrapper,
  PageHeader,
  PageSubtitle,
  FormActions,
  LoadingText,
  NotFoundWrapper,
  LockedOverlay,
  LockedIcon,
} from './ModuleForm.styles'
import type { ModuleFormProps } from './ModuleForm.model'

export function ModuleForm({
  title,
  subtitle,
  isLoading,
  isError,
  isLocked,
  hasUnsavedChanges,
  isSubmitting,
  isDirty,
  onDiscard,
  onSubmit,
  lockedMessage = 'Complete Basic Info first to unlock this module.',
  lockedActionLabel = 'Go to Basic Info',
  onLockedAction,
  children,
}: ModuleFormProps) {
  const navigate = useNavigate()

  if (isLoading) {
    return <LoadingText>Loading...</LoadingText>
  }

  if (isError) {
    return (
      <NotFoundWrapper>
        <p>Resource not found.</p>
        <Button variant="secondary" onClick={() => navigate('/resources')}>
          Back to Resources
        </Button>
      </NotFoundWrapper>
    )
  }

  if (isLocked) {
    return (
      <PageWrapper>
        <PageHeader>
          <h1>{title}</h1>
          <PageSubtitle>{subtitle}</PageSubtitle>
        </PageHeader>
        <Card variant="elevated">
          <LockedOverlay>
            <LockedIcon></LockedIcon>
            <p>{lockedMessage}</p>
            {onLockedAction && (
              <Button variant="secondary" onClick={onLockedAction}>
                {lockedActionLabel}
              </Button>
            )}
          </LockedOverlay>
        </Card>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <PageHeader>
        <h1>{title}</h1>
        <PageSubtitle>{subtitle}</PageSubtitle>
      </PageHeader>

      <Card variant="elevated">
        <form onSubmit={onSubmit}>
          {children}
          <FormActions>
            <Button
              type="button"
              variant="ghost"
              onClick={onDiscard}
              disabled={!isDirty && !hasUnsavedChanges}
            >
              Discard
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              Save Module
            </Button>
          </FormActions>
        </form>
      </Card>
    </PageWrapper>
  )
}
