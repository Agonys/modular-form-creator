import styled from 'styled-components'

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

export const ResourceName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.typography.heading};
  color: ${({ theme }) => theme.colors.inkStrong};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const ModuleProgress = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const MetaText = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`

export const Actions = styled.div`
  display: flex;
  gap: 4px;
`
