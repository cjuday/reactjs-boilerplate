import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button, FormField } from '@/components/ui';
import { getErrorMessage } from '@/shared/utils/GetErrorMessage';
import { useSecurity } from '../hooks/use-security';
import { changePasswordSchema, type ChangePasswordFormValues } from '../schemas/change-password.schema';

export default function ChangePasswordForm() {
    const { change, isLoading } = useSecurity();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values: ChangePasswordFormValues) => {
        try {
            const response = await change(values.currentPassword, values.newPassword);
            toast.success(response.message);
            reset();
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl border bg-white p-6 shadow-sm space-y-5"
        >
            <FormField
                label="Current Password"
                required
                type="password"
                autoComplete="current-password"
                registration={register('currentPassword')}
                error={errors.currentPassword?.message}
            />

            <FormField
                label="New Password"
                required
                type="password"
                autoComplete="new-password"
                registration={register('newPassword')}
                error={errors.newPassword?.message}
            />

            <FormField
                label="Confirm Password"
                required
                type="password"
                autoComplete="new-password"
                registration={register('confirmPassword')}
                error={errors.confirmPassword?.message}
            />

            <div className="flex justify-end">
                <Button
                    type="submit"
                    loading={isLoading}
                >
                    Change Password
                </Button>
            </div>
        </form>
    );
}