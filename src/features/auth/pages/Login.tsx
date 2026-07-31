import AuthLayout from '@/layouts/AuthLayout';
import AuthCard from '../components/AuthCard';
import AuthFooter from '../components/AuthFooter';
import AuthHeader from '../components/AuthHeader';
import LoginForm from '../forms/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Welcome back"
          description="Sign in to continue."
        />

        <LoginForm />

        <AuthFooter
          text="Don't have an account?"
          linkText="Register"
          to="/register"
        />
      </AuthCard>
    </AuthLayout>
  );
}