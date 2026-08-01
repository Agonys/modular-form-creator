import styled from 'styled-components'
import { theme } from '@/design-system'

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`

export const PageSizeSelect = styled.div`
  max-width: 120px;
`

export const PageInfo = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`

export const PageButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`
