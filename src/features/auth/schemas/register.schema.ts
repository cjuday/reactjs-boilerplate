import { z } from 'zod';

export const registerSchema = z.object({
        name: z.string().trim().min(1, 'Full name is required.').min(3, 'Name must be at least 3 characters.').max(100, 'Name is too long.'),
        email: z.string().trim().min(1, 'Email is required.').pipe(z.email('Please enter a valid email address.')),
        phoneNumber: z.string().trim().min(1, 'Phone number is required.').min(10, 'Please enter a valid phone number.').max(20, 'Phone number is too long.'),
        password: z.string().min(1, 'Password is required.').min(8, 'Password must be at least 8 characters.'),
        confirmPassword: z.string().min(1, 'Please confirm your password.'),
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