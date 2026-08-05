import { z } from 'zod';

export const forgotPasswordSchema = z.object({
    email: z.string()
          .trim()
          .min(1, { error: 'Please enter an email address!' })
          .pipe(z.email({ error: 'Please enter a valid email address!' })),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;