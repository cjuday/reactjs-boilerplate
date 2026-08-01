import { LayoutDashboard, Settings, Users, X } from 'lucide-react';
import Logo from './Logo';
import SidebarItem from './SidebarItem';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
    return (
        <>
            {/* Mobile backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex w-60 flex-col
                    bg-white shadow-sm
                    transition-transform duration-300 ease-in-out

                    ${open ? 'translate-x-0' : '-translate-x-full'}

                    lg:static
                    lg:translate-x-0
                    lg:shadow-sm
                `}
            >
                {/* Header */}
                <div className="flex h-16 items-center justify-center bg-white shadow-sm">
                    <Logo />

                    <button type="button" onClick={onClose} className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden">
                        <X size={20} />
                    </button>
                </div>
                {/* Navigation */}
                <nav className="flex-1 space-y-2 p-4" onClick={() => { if (window.innerWidth < 1024) { onClose(); }}}>
                    <SidebarItem to="/dashboard" icon={LayoutDashboard}>Dashboard</SidebarItem>
                    <SidebarItem to="/users" icon={Users}>Users</SidebarItem>
                    <SidebarItem to="/settings" icon={Settings}>Settings</SidebarItem>
                </nav>
            </aside>
        </>
    );
}