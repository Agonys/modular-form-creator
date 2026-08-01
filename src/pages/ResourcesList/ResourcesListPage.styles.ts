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
  margin-bottom: ${theme.spacing.xl};
`

export const HeaderLeft = styled.div`
  h1 {
    font-family: ${({ theme }) => theme.typography.heading};
    font-size: 1.75rem;
    color: ${({ theme }) => theme.colors.inkStrong};
    margin: 0 0 ${theme.spacing.xs} 0;
  }
`

export const Subtitle = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`

export const Filters = styled.form`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  align-items: flex-end;
  flex-wrap: wrap;

  > div:first-child {
    flex: 1;
    min-width: 200px;
  }

  > div:not(:first-child) {
    min-width: 150px;
    max-width: 180px;
  }
`
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  thead {
    background: ${theme.colors.surfaceAlt};
  }

  th {
    text-align: left;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-weight: 600;
    color: ${theme.colors.inkMuted};
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  td {
    padding: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.border};
    vertical-align: middle;

    &.name {
      font-weight: 500;
      color: ${theme.colors.inkStrong};
    }

    &.date {
      color: ${theme.colors.inkMuted};
      font-size: 0.85rem;
    }
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`

export const TableRow = styled.tr`
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${theme.colors.surfaceAlt};
  }
`

export const ProgressCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`

export const ProgressBar = styled.div`
  width: 80px;
  height: 6px;
  background: ${theme.colors.border};
  border-radius: ${theme.radii.pill};
  overflow: hidden;
`

export const ProgressFill = styled.div<{ $progress: number; $complete: boolean }>`
  height: 100%;
  width: ${({ $progress }) => $progress * 100}%;
  background: ${({ $complete }) =>
    $complete ? theme.colors.success : theme.colors.primary};
  border-radius: ${theme.radii.pill};
  transition: width 0.3s;
`

export const ProgressText = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.inkMuted};
`

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.xs};
  color: ${theme.colors.inkMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radii.sm};
  transition: all 0.15s;

  &:hover {
    color: ${theme.colors.warning};
    background: rgba(180, 71, 27, 0.08);
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.inkMuted};
`

export const PaginationWrapper = styled.div`
  margin-top: ${theme.spacing.lg};
`
