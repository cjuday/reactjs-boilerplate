import { z } from 'zod';
import { nameSchema, phoneNumberSchema } from '@/shared/schemas';

export const profileSchema = z.object({
    name: nameSchema,
    phoneNumber: phoneNumberSchema
});

export type ProfileFormValues = z.infer<typeof profileSchema>;