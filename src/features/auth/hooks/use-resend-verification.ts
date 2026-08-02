import { useResendVerificationEmailMutation } from '@/features/auth/api/authApi';

export function useResendVerification() {
    const [resend, { isLoading }] = useResendVerificationEmailMutation();

    const resendEmail = async () => {
        await resend().unwrap();
    };

    return { resendEmail, isLoading };
}