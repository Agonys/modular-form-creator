import type { Priority, ProjectCategory } from './types/resource'

export const PRIORITY_OPTIONS: { label: string; value: Priority }[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
]

export const CATEGORY_OPTIONS: { label: string; value: ProjectCategory }[] = [
  { label: 'Internal', value: 'internal' },
  { label: 'External', value: 'external' },
  { label: 'Vendor', value: 'vendor' },
]

export const TEAM_MEMBER_VALUES = [
  'FE devs',
  'BE devs',
  'Designer',
  'Data Eng',
  'Product Owner',
] as const
