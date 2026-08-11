import type { ReactNode } from 'react';
import AppFooter from '@/components/layouts/AppFooter';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="flex min-h-screen flex-col bg-background">
            <div className="flex flex-1 items-center justify-center px-6 py-12">
                {children}
            </div>
            
            <AppFooter />
        </main>
    );
}