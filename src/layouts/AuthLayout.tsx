import type { ReactNode } from 'react';

import AppFooter from '@/components/layouts/AppFooter';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({
    children,
}: AuthLayoutProps) {
    return (
        <main className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
            <div className="flex flex-1 items-center justify-center p-6">
                {children}
            </div>

            <AppFooter />
        </main>
    );
}