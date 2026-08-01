import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import Sidebar from '@/components/layouts/Sidebar';
import Topbar from '@/components/layouts/Topbar';
import AppFooter from '@/components/layouts/AppFooter';

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
        </div>
    );
}