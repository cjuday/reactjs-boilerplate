import { z } from 'zod';

export const resetPasswordSchema = z
    .object({
        password: z.string()
            .min(8, 'Password must be at least 8 characters long.')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
            .regex(/[0-9]/, 'Password must contain at least one number.'),

        confirmPassword: z.string()
            .min(1, 'Please confirm your password.'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match.',
    });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;