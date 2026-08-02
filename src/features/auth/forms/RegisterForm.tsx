import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button, FormField } from '@/components/ui';
import { getErrorMessage } from '@/shared/utils/GetErrorMessage';
import { useRegister } from '../hooks/use-register';
import { registerSchema, type RegisterFormValues } from '../schemas/register.schema';

export default function RegisterForm() {
  const navigate = useNavigate();

  const { signUp, isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await signUp({
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
      });

      navigate('/dashboard');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField
        label="Full Name"
        required
        placeholder="Enter your full name"
        autoComplete="name"
        registration={register('name')}
        error={errors.name?.message}
      />

      <FormField
        label="Email"
        required
        type="email"
        placeholder="Enter your email"
        autoComplete="email"
        registration={register('email')}
        error={errors.email?.message}
      />

      <FormField
        label="Phone Number"
        required
        type="text"
        placeholder="+8801712345678"
        autoComplete="tel"
        registration={register('phoneNumber')}
        error={errors.phoneNumber?.message}
      />

      <FormField
        label="Password"
        required
        type="password"
        placeholder="Enter your password"
        autoComplete="new-password"
        registration={register('password')}
        error={errors.password?.message}
      />

      <FormField
        label="Confirm Password"
        required
        type="password"
        placeholder="Confirm your password"
        autoComplete="new-password"
        registration={register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        loading={isLoading}
        fullWidth
      >
        Create Account
      </Button>
    </form>
  );
}