import { useResetPasswordMutation } from '../api/authApi';

export function useResetPassword() {
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const reset = async (token: string, password: string) => {
        return await resetPassword({ token, password }).unwrap();
    };

    return { reset, isLoading };
}