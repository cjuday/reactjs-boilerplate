import { z } from 'zod';

export const emailSchema = z.string()
            .trim()
            .min(1, 'Email is required.')
            .pipe(z.email('Please enter a valid email address.'));