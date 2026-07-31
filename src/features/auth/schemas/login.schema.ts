import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
          .trim()
          .min(1, { error: 'Please enter an email address!' })
          .pipe(z.email({ error: 'Please enter a valid email address!' })),
  password: z.string()
             .min(1, { error: 'Please enter a password!' }),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;