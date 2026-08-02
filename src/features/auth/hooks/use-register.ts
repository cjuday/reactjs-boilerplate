import { useAppDispatch } from '@/app/hooks';
import { setCredentials } from '../store/auth.slice';
import { useRegisterMutation } from '@/features/auth/api/authApi';
import type { RegisterRequest } from '../types';

export function useRegister() {
    const dispatch = useAppDispatch();
    const [register, { isLoading }] = useRegisterMutation();
    const signUp = async (data: RegisterRequest) => {
        const response = await register(data).unwrap();
        dispatch(setCredentials(response));
        return response;
    };

    return { signUp, isLoading };
}