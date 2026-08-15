import { emailSchema, nameSchema, phoneNumberSchema } from '@/shared/schemas';
import { z } from 'zod';

export const userSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phoneNumber: phoneNumberSchema,
});

export type UserFormValues = z.infer<
    typeof userSchema
>;