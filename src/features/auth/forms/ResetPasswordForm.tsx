import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button, FormField } from '@/components/ui';
import { getErrorMessage } from '@/shared/utils/GetErrorMessage';
import { useResetPassword } from '../hooks/use-reset-password';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../schemas/reset-password.schema';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Props {
    token: string;
}

export default function ResetPasswordForm({ token }: Props) {
    const { reset, isLoading } = useResetPassword();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values: ResetPasswordFormValues) => {
        try {
            const response = await reset(
                token,
                values.password,
            );

            navigate('/', {
                replace: true,
                state: {
                    successMessage: response.message,
                },
            });
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <FormField
                label="New Password"
                required
                type="password"
                placeholder="Enter your new password"
                autoComplete="new-password"
                registration={register('password')}
                error={errors.password?.message}
            />

            <FormField
                label="Confirm Password"
                required
                type="password"
                placeholder="Confirm your new password"
                autoComplete="new-password"
                registration={register('confirmPassword')}
                error={errors.confirmPassword?.message}
            />

            <Button
                type="submit"
                loading={isLoading}
                fullWidth
            >
                Reset Password
            </Button>
            <div className="text-center">
                <Link
                    to="/"
                    className="text-sm font-medium text-primary hover:underline"
                >
                    Back to Login
                </Link>
            </div>
        </form>
    );
}