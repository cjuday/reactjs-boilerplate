import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import Topbar from '@/components/layouts/Topbar';
import AppFooter from '@/components/layouts/AppFooter';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearCredentials } from '@/features/auth/store/auth.slice';
import VerifyEmailModal from '@/components/modals/VerifyEmailModal';
import { useCountdown } from '@/shared/hooks/use-countdown';
import { useResendVerification } from '@/features/auth/hooks/use-resend-verification';
import { getErrorMessage } from '@/shared/utils/GetErrorMessage';
import { toast } from 'sonner';

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearCredentials());
        navigate('/login', { replace: true });
    };

    const { resendEmail, isLoading } = useResendVerification();
    const { seconds, restart, isFinished } = useCountdown(60);

    const handleResend = async () => {
         try {
            await resendEmail();
            restart();
            toast.success('Verification email sent.');
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar onMenuClick={() => setSidebarOpen(true)}/>
                <div className="flex flex-1 flex-col overflow-y-auto">
                    <main className="flex-1 p-5 lg:p-6">
                        <Outlet />
                    </main>
                    <AppFooter />
                </div>
            </div>
            <VerifyEmailModal
                open={!!user && !user.isEmailVerified}
                email={user?.email ?? ''}
                countdown={seconds}
                isResending={isLoading}
                onLogout={handleLogout}
                onResend={handleResend}
            />
        </div>
    );
}