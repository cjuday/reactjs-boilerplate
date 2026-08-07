import { z } from 'zod';
import { confirmPasswordSchema, emailSchema } from '@/shared/schemas';

export const loginSchema = z.object({
  email: emailSchema,
  password: confirmPasswordSchema,
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;