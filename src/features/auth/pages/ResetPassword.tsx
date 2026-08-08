import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import { Button } from '@/components/ui';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get('token');

    if (!token) {
        return (
            <AuthLayout>
                <AuthCard>
                    <div className="flex flex-col items-center text-center">
                        <XCircle
                            className="text-red-600"
                            size={56}
                        />

                        <h2 className="mt-6 text-xl font-semibold">
                            Invalid Reset Link
                        </h2>

                        <p className="mt-2 text-[var(--muted-foreground)]">
                            This password reset link is invalid.
                        </p>

                        <Button
                            className="mt-6"
                            fullWidth
                            onClick={() => navigate('/')}
                        >
                            Back to Login
                        </Button>
                    </div>
                </AuthCard>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <AuthCard>
                <AuthHeader
                    title="Reset Password"
                    description="Enter your new password below."
                />

                <ResetPasswordForm token={token} />
            </AuthCard>
        </AuthLayout>
    );
}