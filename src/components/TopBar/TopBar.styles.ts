import styled from 'styled-components'
import { theme } from '@/design-system'

export const TopBarWrapper = styled.div`
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
`

export const TopBarInner = styled.div`
  max-width: 1024px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`

export const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
`

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.xs};
  color: ${theme.colors.inkMuted};
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  border-radius: ${theme.radii.sm};
  transition: all 0.15s;

  &:hover {
    color: ${theme.colors.inkStrong};
    background: ${theme.colors.surfaceAlt};
  }
`

export const TopBarRight = styled.span`
  font-size: 0.85rem;
  color: ${theme.colors.inkMuted};
`
