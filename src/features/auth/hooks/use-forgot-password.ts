import { useForgotPasswordMutation } from '../api/authApi';

export function useForgotPassword() {
    const [forgotPassword, { isLoading }] =
        useForgotPasswordMutation();

    const sendResetLink = async (email: string) => {
        return await forgotPassword({ email }).unwrap();
    };

    return { sendResetLink, isLoading };
}