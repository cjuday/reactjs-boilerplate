import { z } from 'zod';
import { passwordSchema, confirmPasswordSchema } from '@/shared/schemas';

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Current password is required.'),
        newPassword: passwordSchema,
        confirmPassword: confirmPasswordSchema,
    })
    .refine(
        (data) => data.newPassword === data.confirmPassword,
        {
            path: ['confirmPassword'],
            message: 'Passwords do not match.',
        },
    );

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;