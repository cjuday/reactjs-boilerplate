import { type PropsWithChildren, useEffect, useState } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { Spinner } from '@/components/ui';
import { authApi } from '@/features/auth/api/authApi';
import { clearCredentials, setCredentials } from '@/features/auth/store/auth.slice';

export default function AuthBootstrap({ children }: PropsWithChildren) {
    const dispatch = useAppDispatch();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const bootstrap = async () => {
            try {
                const response = await dispatch(authApi.endpoints.refresh.initiate()).unwrap();
                dispatch(setCredentials(response));
            } catch {
                dispatch(clearCredentials());
            } finally {
                setInitialized(true);
            }
        };
        void bootstrap();
    }, [dispatch]);

    if (!initialized) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner size="xl" />
            </div>
        );
    }

  return children;
}