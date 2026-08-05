import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button, Checkbox, FormField } from '@/components/ui';
import { getErrorMessage } from '@/shared/utils/GetErrorMessage';
import { useLogin } from '../hooks/use-login';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';

export default function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const hasShownSuccessMessage = useRef(false);

    useEffect(() => {
        const message = location.state?.successMessage;

        if (!message || hasShownSuccessMessage.current) {
            return;
        }

        hasShownSuccessMessage.current = true;

        if (message) {
            toast.success(message);

            navigate(location.pathname, {
                replace: true,
                state: null,
            });
        }
    }, [location, navigate]);

    const { signIn, isLoading } = useLogin();
    const { register, handleSubmit, formState: { errors }} = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            await signIn(values.email, values.password, values.rememberMe);
            navigate('/dashboard');
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField
                label="Email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                registration={register('email')}
                error={errors.email?.message}
            />

            <FormField
                label="Password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                registration={register('password')}
                error={errors.password?.message}
            />

            <div className="flex items-center justify-between">
                <Checkbox
                    label="Remember me"
                    registration={register('rememberMe')}
                />

                <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:underline"
                >
                    Forgot password?
                </Link>
            </div>

            <Button type="submit" loading={isLoading} fullWidth>
                Sign In
            </Button>
        </form>
  );
}