import { z } from 'zod';

export const confirmPasswordSchema = z.string()
            .min(1, 'Please confirm your password.');