import styled from 'styled-components'
import { theme } from '../../design-system'

export const PageWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: ${theme.spacing.xxl} ${theme.spacing.lg};
`

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
`

export const HeaderLeft = styled.div`
  h1 {
    font-family: ${({ theme }) => theme.typography.heading};
    font-size: 1.5rem;
    color: ${theme.colors.inkStrong};
    margin: 0 0 ${theme.spacing.xs} 0;
    display: inline-flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }
`

export const ResourceMeta = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${theme.colors.inkMuted};
`

export const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`

export const SectionLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${theme.colors.inkMuted};
  display: block;
  margin-bottom: ${theme.spacing.md};
`

export const ModuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  margin-left: auto;
  margin-right: auto;
`

export const ModuleCard = styled.div<{ $locked?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  cursor: ${({ $locked }) => ($locked ? 'not-allowed' : 'pointer')};
  opacity: ${({ $locked }) => ($locked ? 0.6 : 1)};
  transition: all 0.15s;

  ${({ $locked }) =>
    !$locked &&
    `
    &:hover {
      border-color: ${theme.colors.primary};
      box-shadow: 0 2px 8px ${theme.colors.shadow};
    }
  `}
`

export const ModuleIcon = styled.div<{ $complete: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $complete }) =>
    $complete ? 'rgba(46, 139, 87, 0.12)' : theme.colors.surfaceAlt};
  color: ${({ $complete }) => ($complete ? theme.colors.success : theme.colors.inkMuted)};
  flex-shrink: 0;
`

export const ModuleInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const ModuleTitle = styled.h3`
  margin: 0 0 2px 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${theme.colors.inkStrong};
`

export const ModuleDescription = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${theme.colors.inkMuted};
`

export const ModuleStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  flex-shrink: 0;
`

export const StatusText = styled.span<{ $complete: boolean }>`
  font-size: 0.8rem;
  color: ${({ $complete }) => ($complete ? theme.colors.success : theme.colors.inkMuted)};
`

export const InfoBanner = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: rgba(60, 90, 137, 0.06);
  border: 1px solid rgba(60, 90, 137, 0.15);
  border-radius: ${theme.radii.md};
  color: ${theme.colors.info};
`

export const InfoBannerTitle = styled.strong`
  display: block;
  font-size: 0.85rem;
  margin-bottom: 4px;
`

export const InfoBannerText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.5;
`

export const SuccessBanner = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: rgba(46, 139, 87, 0.06);
  border: 1px solid rgba(46, 139, 87, 0.15);
  border-radius: ${theme.radii.md};
  color: ${theme.colors.success};
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
