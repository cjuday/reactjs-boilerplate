import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button, FormField } from '@/components/ui';
import { getErrorMessage } from '@/shared/utils/GetErrorMessage';
import { useForgotPassword } from '../hooks/use-forgot-password';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../schemas/forgot-password.schema';
import { Link } from 'react-router-dom';

export default function ForgotPasswordForm() {
    const { sendResetLink, isLoading } = useForgotPassword();
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (values: ForgotPasswordFormValues) => {
        try {
            const response = await sendResetLink(values.email);

            toast.success(response.message);
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
                label="Email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                registration={register('email')}
                error={errors.email?.message}
            />

            <Button
                type="submit"
                loading={isLoading}
                fullWidth
            >
                Send Reset Link
            </Button>
        </form>
    );
}