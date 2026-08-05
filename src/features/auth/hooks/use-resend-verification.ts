import { useResendVerificationEmailMutation } from '@/features/auth/api/authApi';

export function useResendVerification() {
    const [resend, { isLoading }] = useResendVerificationEmailMutation();

    const resendEmail = async () => {
        return await resend().unwrap();
    };

    return { resendEmail, isLoading };
}