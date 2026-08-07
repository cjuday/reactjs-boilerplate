import { useAppDispatch } from '@/app/hooks';
import { updateUser } from '@/features/auth/store/auth.slice';
import { useUpdateProfileMutation } from '../api/profileApi';

export function useProfile() {
    const dispatch = useAppDispatch();

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const update = async ( name: string, phoneNumber: string ) => {
        const response = await updateProfile({ name, phoneNumber }).unwrap();
        dispatch(updateUser(response.user));
        return response;
    };

    return { update, isLoading };
}