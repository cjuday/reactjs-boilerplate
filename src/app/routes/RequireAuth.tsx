import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';

export default function RequireAuth() {
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    
    return accessToken ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace />
    );
}