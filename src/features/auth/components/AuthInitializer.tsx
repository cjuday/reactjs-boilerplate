import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { useRefreshMutation } from '../api/authApi';
import {
    clearCredentials,
    setCredentials,
} from '../store/auth.slice';

export default function AuthInitializer() {
    const dispatch = useAppDispatch();
    const [refresh] = useRefreshMutation();

    useEffect(() => {
        let mounted = true;

        const initialize = async () => {
            try {
                const response = await refresh().unwrap();

                if (mounted) {
                    dispatch(setCredentials(response));
                }
            } catch {
                if (mounted) {
                    dispatch(clearCredentials());
                }
            }
        };

        initialize();

        return () => {
            mounted = false;
        };
    }, [refresh, dispatch]);

    return null;
}