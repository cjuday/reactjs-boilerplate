import type { ReactNode } from 'react';
import AuthPageFooter from '@/components/layouts/AuthPageFooter';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="flex min-h-screen flex-col bg-gray-50">
            <div className="flex flex-1 items-center justify-center px-6 py-12">
                {children}
            </div>
            
            <AuthPageFooter />
        </main>
    );
}