import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui';
import { getErrorMessage } from '@/shared/utils/GetErrorMessage';
import { useGetUserQuery, useUpdateUserMutation } from '../api/userApi';
import UserForm from '../forms/UserForm';
import { userEditSchema, type UserEditFormValues } from '../schemas/user-edit.schema';

export default function UserEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        data: user,
        isLoading: userLoading,
        isError,
    } = useGetUserQuery(id!, {
        skip: !id,
    });

    const [
        updateUser,
        { isLoading: updateLoading },
    ] = useUpdateUserMutation();

    const form = useForm<UserEditFormValues>({
        resolver: zodResolver(userEditSchema),
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
        },
    });

    const {
        reset,
        handleSubmit,
    } = form;

    useEffect(() => {
        if (!user) {
            return;
        }

        reset({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber ?? '',
        });
    }, [user, reset]);

    const onSubmit = async (
        values: UserEditFormValues,
    ) => {
        if (!id) {
            return;
        }

        try {
            const response = await updateUser({
                id,
                data: {
                    name: values.name,
                    phoneNumber: values.phoneNumber,
                },
            }).unwrap();

            toast.success(response.message);

            navigate('/users');
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    if (userLoading) {
        return (
            <div className="ml-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Edit User
                    </h1>

                    <p className="mt-1 text-sm text-muted">
                        Update user information.
                    </p>
                </div>

                <div className="rounded-card bg-surface p-6 shadow-card">
                    <p className="text-sm text-muted">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="ml-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Edit User
                    </h1>

                    <p className="mt-1 text-sm text-muted">
                        Unable to load this user.
                    </p>
                </div>

                <div className="rounded-card border border-border bg-surface p-6 shadow-card">
                    <p className="text-sm text-danger">
                        User not found.
                    </p>

                    <div className="mt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate('/users')}
                        >
                            Back to Users
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ml-4 max-w-2xl">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-foreground">
                    Edit User
                </h1>

                <p className="mt-1 text-sm text-muted">
                    Update user information.
                </p>
            </div>

            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <UserForm
                        mode="edit"
                        email={user.email}
                        loading={updateLoading}
                        submitLabel="Save Changes"
                        onCancel={() => navigate('/users')}
                    />
                </form>
            </FormProvider>
        </div>
    );
}