import { theme } from '@/design-system'
import styled from 'styled-components'

export const Wrapper = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl} ${theme.spacing.lg};
`

export const Heading = styled.h1`
  font-size: 3rem;
  color: ${theme.colors.inkStrong};
  margin: 0 0 ${theme.spacing.sm} 0;
`

export const Message = styled.p`
  color: ${theme.colors.inkMuted};
  margin: 0 0 ${theme.spacing.lg} 0;
`
