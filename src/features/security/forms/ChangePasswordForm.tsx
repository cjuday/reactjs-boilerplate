import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button, FormField } from '@/components/ui';
import { getErrorMessage } from '@/shared/utils/GetErrorMessage';
import { useSecurity } from '../hooks/use-security';
import { changePasswordSchema, type ChangePasswordFormValues } from '../schemas/change-password.schema';
import { useNavigate } from 'react-router-dom';

export default function ChangePasswordForm() {
    const { change, isLoading } = useSecurity();
    const navigate = useNavigate();

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
            className="rounded-card bg-surface p-5 shadow-card space-y-5"
        >
            <span className="text-arctic-blue-heavy text-xl leading-none">Change Password</span>
            <hr className='mt-1 border-border'/>
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

            <div className="flex gap-2 pt-5">
                <Button size='xs' variant='danger' className='flex-1' onClick={() => navigate('/dashboard')}>Cancel</Button>
                <Button type="submit" loading={isLoading} size='xs' className='flex-1'>
                    Update
                </Button>
                
            </div>
        </form>
    );
}