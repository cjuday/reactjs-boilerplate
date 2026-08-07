import { z } from 'zod';
import { confirmPasswordSchema, emailSchema, nameSchema, passwordSchema, phoneNumberSchema } from '@/shared/schemas';

export const registerSchema = z.object({
        name: nameSchema,
        email: emailSchema,
        phoneNumber: phoneNumberSchema,
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema,
    })
    .refine(
        ({ password, confirmPassword }) =>
            password === confirmPassword,
            {
                path: ['confirmPassword'],
                message: 'Passwords do not match.',
            },
    );

export type RegisterFormValues = z.infer<typeof registerSchema>;