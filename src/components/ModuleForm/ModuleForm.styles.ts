import styled from 'styled-components'
import { theme } from '@/design-system'

export const PageWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: ${theme.spacing.xxl} ${theme.spacing.lg};
`

export const PageHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};

  h1 {
    font-family: ${theme.typography.heading};
    font-size: 1.5rem;
    color: ${theme.colors.inkStrong};
    margin: 0 0 ${theme.spacing.xs} 0;
  }
`

export const PageSubtitle = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${theme.colors.inkMuted};
`

export const FormField = styled.div`
  margin-bottom: ${theme.spacing.lg};

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
`

export const LoadingText = styled.p`
  color: ${theme.colors.inkMuted};
  text-align: center;
  padding: ${theme.spacing.xxl} 0;
`

export const NotFoundWrapper = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl} 0;
  color: ${theme.colors.inkMuted};
`

export const LockedOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxl};
  text-align: center;
  color: ${theme.colors.inkMuted};
  gap: ${theme.spacing.md};
`

export const LockedIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.colors.surfaceAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.inkMuted};
`
