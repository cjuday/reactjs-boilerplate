import { z } from 'zod';
import {
    emailSchema,
    nameSchema,
    passwordSchema,
    phoneNumberSchema,
} from '@/shared/schemas';

export const userCreateSchema = z
    .object({
        name: nameSchema,
        email: emailSchema,
        phoneNumber: phoneNumberSchema,
        roleId: z.string().min(1, 'Role is required.'),
        isActive: z.boolean(),
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'Please confirm your password.'),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: 'Passwords do not match.',
            path: ['confirmPassword'],
        },
    );

export type UserCreateFormValues = z.infer<typeof userCreateSchema>;