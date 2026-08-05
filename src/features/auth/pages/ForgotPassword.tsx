import AuthLayout from '@/layouts/AuthLayout';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import AuthFooter from '../components/AuthFooter';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

export default function ForgotPassword() {
    return (
        <AuthLayout>
            <AuthCard>
                <AuthHeader
                    title="Forgot your password?"
                    description="Enter your email and we'll send you a password reset link."
                />

                <ForgotPasswordForm />

                <AuthFooter
                    text="Remember your password?"
                    linkText="Back to Login"
                    to="/"
                />
            </AuthCard>
        </AuthLayout>
    );
}