import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getErrorMessage } from '@/shared/utils/GetErrorMessage';
import { useCreateUserMutation } from '../api/userApi';

import UserForm from '../forms/UserForm';

import {
    userCreateSchema,
    type UserCreateFormValues,
} from '../schemas/user-create.schema';

export default function UserCreate() {
    const navigate = useNavigate();

    const [
        createUser,
        { isLoading: createLoading },
    ] = useCreateUserMutation();

    const form = useForm<UserCreateFormValues>({
        resolver: zodResolver(userCreateSchema),
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
            roleId: '',
            isActive: true,
            password: '',
            confirmPassword: '',
        },
    });

    const { handleSubmit } = form;

    const onSubmit = async (values: UserCreateFormValues) => {
        try {
            const response = await createUser({
                name: values.name,
                email: values.email,
                phoneNumber: values.phoneNumber,
                roleId: values.roleId,
                isActive: values.isActive,
                password: values.password,
                confirmPassword:
                    values.confirmPassword,
            }).unwrap();

            toast.success(response.message);

            navigate('/users');
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-foreground">
                    Create User
                </h1>

                <p className="mt-1 text-sm text-muted">
                    Create a new system user.
                </p>
            </div>

            <FormProvider {...form}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <UserForm
                        mode="create"
                        loading={createLoading}
                        submitLabel="Create User"
                        onCancel={() =>
                            navigate('/users')
                        }
                    />
                </form>
            </FormProvider>
        </div>
    );
}