import {
    emailSchema,
    nameSchema,
    passwordSchema,
    phoneNumberSchema,
} from '@/shared/schemas';
import { z } from 'zod';

export const userFormSchema = z
    .object({
        name: nameSchema,
        email: emailSchema,
        phoneNumber: phoneNumberSchema,
        roleId: z.string().min(1, 'Role is required.'),
        isActive: z.boolean(),
        password: passwordSchema.or(z.literal('')),
        confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
        // Both empty = editing without changing password.
        if ( data.password === '' && data.confirmPassword === '') {
            return;
        }

        // Password entered, confirmation missing.
        if (data.password !== '' && data.confirmPassword === '') {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPassword'],
                message: 'Please confirm your password.',
            });

            return;
        }

        // Confirmation entered, password missing.
        if (data.password === '' && data.confirmPassword !== '') {
            ctx.addIssue({
                code: 'custom',
                path: ['password'],
                message: 'Please enter a password.',
            });

            return;
        }

        // Both entered but don't match.
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPassword'],
                message: 'Passwords do not match.',
            });
        }
    });

export type UserFormValues = z.infer<typeof userFormSchema>;