import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { api } from '@/services/api';
import { clearCredentials } from '../store/auth.slice';
import { useLogoutMutation } from '../api/authApi';

export function useLogout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();
    const signOut = async () => {
        try {
            await logout().unwrap();
        } finally {
            dispatch(clearCredentials());
            dispatch(api.util.resetApiState());
            navigate('/', { replace: true });
        }
    };

    return { signOut };
}