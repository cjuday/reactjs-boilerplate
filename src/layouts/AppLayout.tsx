import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import Topbar from '@/components/layouts/Topbar';
import AppFooter from '@/components/layouts/AppFooter';
import VerifyEmailModal from '@/components/modals/VerifyEmailModal';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useCountdown } from '@/shared/hooks/use-countdown';
import { useResendVerification } from '@/features/auth/hooks/use-resend-verification';
import { getErrorMessage } from '@/shared/utils/GetErrorMessage';
import { updateUser } from '@/features/auth/store/auth.slice';
import { toast } from 'sonner';
import { socket } from '@/services/socket';

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [verifyModalOpen, setVerifyModalOpen] = useState(true);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const { resendEmail, isLoading } = useResendVerification();
    const { seconds } = useCountdown(user?.emailVerificationExpiresAt ?? null);
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    useEffect(() => {
        if (!accessToken) {
            socket.disconnect();
            return;
        }

        socket.auth = { token: accessToken };

        socket.connect();
        return () => {
            socket.disconnect();
        };
    }, [accessToken]);

    useEffect(() => {
        socket.on('email_verified', (payload) => {
            dispatch(updateUser(payload));
            setVerifyModalOpen(false);
            toast.success('Email verified successfully.');
        });

        return () => { socket.off('email_verified'); };
    }, [dispatch]);

    const handleResend = async () => {
        try {
            const response = await resendEmail();
            dispatch(updateUser({ emailVerificationExpiresAt: response.emailVerificationExpiresAt }),
        );
            toast.success(response.message);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    useEffect(() => {
        if (user && !user.isEmailVerified) {
            setVerifyModalOpen(true);
        }
    }, [user]);

    return (
        <>
            <div className="flex h-screen flex-col text-[var(--foreground)]">
                <Topbar onMenuClick={() => setSidebarOpen(true)}/>
                <div className="flex flex-1 overflow-hidden">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block">
                        <Sidebar
                            open={true}
                            collapsed={sidebarCollapsed}
                            onCollapse={() =>
                                setSidebarCollapsed((value) => !value)
                            }
                            onClose={() => {}}
                        />
                    </div>

                    {/* Mobile Sidebar */}
                    <div className="lg:hidden">
                        <Sidebar
                            open={sidebarOpen}
                            collapsed={false}
                            onCollapse={() => {}}
                            onClose={() =>
                                setSidebarOpen(false)
                            }
                        />
                    </div>
                    <main className="min-w-0 flex-1 overflow-y-auto p-5 lg:p-6">
                        <Outlet />
                    </main>
                </div>
                <AppFooter />
            </div>

            <VerifyEmailModal
                open={!!user && !user.isEmailVerified && verifyModalOpen}
                email={user?.email ?? ''}
                countdown={seconds}
                isResending={isLoading}
                onResend={handleResend}
                onClose={() => setVerifyModalOpen(false)}
            />
        </>
    );
}