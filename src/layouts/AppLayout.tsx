import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Sidebar from '@/components/layouts/Sidebar';
import Topbar from '@/components/layouts/Topbar';
import AppFooter from '@/components/layouts/AppFooter';
import VerifyEmailModal from '@/components/modals/VerifyEmailModal';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearCredentials } from '@/features/auth/store/auth.slice';

import { useCountdown } from '@/shared/hooks/use-countdown';
import { useResendVerification } from '@/features/auth/hooks/use-resend-verification';
import { getErrorMessage } from '@/shared/utils/GetErrorMessage';

import { toast } from 'sonner';

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const user = useAppSelector((state) => state.auth.user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { resendEmail, isLoading } = useResendVerification();

    const { seconds, restart } = useCountdown(
        user?.emailVerificationExpiresAt ?? null,
    );

    const handleResend = async () => {
        try {
            await resendEmail();

            restart();

            toast.success(
                'Verification email sent.',
            );
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <>
            <div className="flex h-screen flex-col bg-slate-50">

                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                />

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

            {/* <VerifyEmailModal
                open={
                    !!user &&
                    !user.isEmailVerified
                }
                email={user?.email ?? ''}
                countdown={seconds}
                isResending={isLoading}
                onResend={handleResend}
            /> */}
        </>
    );
}