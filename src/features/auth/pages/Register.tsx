import AuthLayout from '@/layouts/AuthLayout';
import AuthCard from '../components/AuthCard';
import AuthFooter from '../components/AuthFooter';
import AuthHeader from '../components/AuthHeader';
import RegisterForm from '../forms/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create your account"
          description="Register to get started."
        />

        <RegisterForm />

        <AuthFooter
          text="Already have an account?"
          linkText="Login"
          to="/"
        />
      </AuthCard>
    </AuthLayout>
  );
}