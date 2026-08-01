import styled from 'styled-components'
import { Card, theme } from '@/design-system'

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

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
`

export const DetailCard = styled(Card)`
  padding: ${theme.spacing.lg};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
`

export const DetailCardTitle = styled.h3`
  font-family: ${theme.typography.heading};
  font-size: 1.1rem;
  color: ${theme.colors.inkStrong};
  margin: 0 0 ${theme.spacing.md} 0;
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  justify-content: space-between;
`

export const DetailField = styled.div`
  margin-bottom: ${theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`

export const DetailLabel = styled.span`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${theme.colors.inkMuted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
`

export const DetailValue = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${theme.colors.inkStrong};
  word-break: break-word;
`

export const OptionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
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

export const UnsavedBanner = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  background: rgba(180, 71, 27, 0.08);
  border: 1px solid rgba(180, 71, 27, 0.2);
  border-radius: ${theme.radii.sm};
  color: ${theme.colors.warning};
  font-size: 0.85rem;
`
