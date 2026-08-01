import { z } from 'zod'

export const basicInfoSchema = z.object({
  resourceName: z
    .string()
    .min(1, 'Resource name is required')
    .max(255, 'Resource name must be at most 255 characters')
    .regex(
      /^[A-Za-z0-9 -]+$/,
      'Resource name can only contain letters, numbers, spaces, and hyphens',
    ),
  owner: z
    .string()
    .min(1, 'Owner is required')
    .max(255, 'Owner must be at most 255 characters')
    .regex(/^[A-Za-z ]+$/, 'Owner can only contain letters and spaces'),
  email: z.email({
    error: 'Email must be a valid email format',
  }),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be at most 1000 characters'),
  priority: z.enum(['low', 'medium', 'high'], {
    error: 'Priority must be one of: low, medium, high',
  }),
})

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>
