import { z } from 'zod';

export const nameSchema = z.string()
            .trim()
            .min(1, 'Full name is required.')
            .min(3, 'Name must be at least 3 characters.')
            .max(100, 'Name is too long.');