import { z } from 'zod';

export const phoneNumberSchema = z.string()
            .trim()
            .min(1, 'Phone number is required.')
            .min(10, 'Please enter a valid phone number.')
            .max(20, 'Phone number is too long.');