import { emailSchema, nameSchema, phoneNumberSchema } from '@/shared/schemas';
import { z } from 'zod';

export const userEditSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phoneNumber: phoneNumberSchema,
});

export type UserEditFormValues = z.infer<typeof userEditSchema>;