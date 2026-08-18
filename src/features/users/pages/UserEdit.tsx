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
import PageHeader from '@/components/layouts/PageHeader';
import PageLoader from '@/components/ui/PageLoader';
import { UserX } from 'lucide-react';

export default function UserEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: user, isLoading: userLoading, isError } = useGetUserQuery(id!, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });
    const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

    const form = useForm<UserEditFormValues>({
        resolver: zodResolver(userEditSchema),
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
            roleId: '',
            isActive: true,
            password: '',
            confirmPassword: ''
        },
    });

    const { reset, handleSubmit } = form;

    useEffect(() => {
        if (!user) return;

        reset({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber ?? '',
            roleId: user.role?.id ?? '',
            isActive: user.isActive,
            password: '',
            confirmPassword: '',
        });
    }, [user, reset]);

    const onSubmit = async (values: UserEditFormValues) => {
        if (!id) return;

        try {
            const response = await updateUser({
                id,
                data: {
                    name: values.name,
                    phoneNumber: values.phoneNumber,
                    roleId: values.roleId,
                    isActive: values.isActive,
                    ...(values.password ? {
                        password: values.password,
                        confirmPassword: values.confirmPassword
                    } : {}),

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
            <div>
                <PageHeader title="Edit User" subTitle="Update user information." />
                <PageLoader />
            </div>
        )
    }

    if (isError || !user) {
        return (
            <div>
                <PageHeader title="Edit User" subTitle="Update user information." />

                <div className="w-full mx-auto max-w-4xl flex min-h-80 items-center justify-center rounded-card border border-border bg-surface shadow-card">
                    <div className="flex max-w-2xl flex-col items-center text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-danger/10 text-danger">
                            <UserX size={28} />
                        </div>

                        <h2 className="text-lg font-semibold text-foreground">
                            User not found
                        </h2>

                        <p className="mt-2 text-sm text-muted">
                            We couldn't find the user you're trying to edit.
                            They may have been deleted or the link may be invalid.
                        </p>

                        <Button
                            type="button"
                            variant="primary"
                            className="mt-6"
                            size="xs"
                            onClick={() => { navigate('/users') }}
                        >
                            Back to Users
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <PageHeader title="Edit User" subTitle="Update user information." />

            <div className="mx-auto w-full max-w-6xl">
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
        </div>
    );
}