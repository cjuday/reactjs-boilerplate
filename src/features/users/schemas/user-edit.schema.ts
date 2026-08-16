import { z } from 'zod';
import { userFormSchema } from './user-form.schema';

export const userEditSchema = userFormSchema;

export type UserEditFormValues = z.infer<typeof userEditSchema>;