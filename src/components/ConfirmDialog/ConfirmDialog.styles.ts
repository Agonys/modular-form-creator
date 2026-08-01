import styled from 'styled-components'
import { theme } from '@/design-system'

export const DialogContent = styled.div`
  padding: ${theme.spacing.lg};
`

export const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
`
