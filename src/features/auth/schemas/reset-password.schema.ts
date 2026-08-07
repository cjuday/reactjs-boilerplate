import { z } from 'zod';
import { passwordSchema, confirmPasswordSchema } from '@/shared/schemas';

export const resetPasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match.',
    });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;