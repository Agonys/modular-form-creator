import { TEAM_MEMBER_VALUES } from '@/constants'
import { z } from 'zod'

export const projectDetailsSchema = z.object({
  projectName: z
    .string()
    .min(1, 'Project name is required')
    .max(255, 'Project name must be at most 255 characters')
    .regex(
      /^[A-Za-z0-9 -]+$/,
      'Project name can only contain letters, numbers, spaces, and hyphens',
    ),
  budget: z
    .string()
    .min(1, 'Budget is required')
    .regex(/^\d+$/, 'Budget must contain only integers'),
  category: z.enum(['internal', 'external', 'vendor'], {
    error: 'Category must be one of: internal, external, vendor',
  }),
  options: z
    .array(z.enum(TEAM_MEMBER_VALUES))
    .min(1, 'At least one team member is required'),
})

export type ProjectDetailsFormValues = z.infer<typeof projectDetailsSchema>
