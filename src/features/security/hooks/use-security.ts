import { useChangePasswordMutation } from '../api/securityApi';

export function useSecurity() {
    const [changePassword, { isLoading }] =  useChangePasswordMutation();

    const change = async ( currentPassword: string, newPassword: string ) => {
        return await changePassword({ currentPassword, newPassword }).unwrap();
    };

    return { change, isLoading };
}