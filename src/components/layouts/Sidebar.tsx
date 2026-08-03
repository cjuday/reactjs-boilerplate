import { LayoutDashboard, Settings, Users, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SidebarItem from './SidebarItem';

interface SidebarProps {
    open: boolean;
    collapsed: boolean;
    onClose: () => void;
    onCollapse: () => void;
}

export default function Sidebar({ open, collapsed, onClose, onCollapse }: SidebarProps) {
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
                    h-full bg-white shadow-sm transition-all duration-300
                    fixed inset-y-0 left-0 z-50
                    ${open ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:inset-auto lg:translate-x-0
                    ${collapsed ? 'lg:w-20' : 'lg:w-60'}
                    w-60
                    flex flex-col
                `}
            >
                <button
                    type="button"
                    onClick={onCollapse}
                    className="absolute -right-4 top-24 z-50 hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md transition-all duration-200 hover:scale-110 hover:bg-slate-50 active:scale-95 lg:flex"
                    // className="absolute -right-4 top-1/2 z-50 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md transition-all duration-200 hover:scale-110 hover:bg-slate-50 active:scale-95 lg:flex"
                >
                    {collapsed ? (
                        <ChevronRight size={16} />
                    ) : (
                        <ChevronLeft size={16} />
                    )}
                </button>
                {/* Header */}
                {open && (
                    <div className="flex justify-end border-b p-2 lg:hidden">
                        <button
                            onClick={onClose}
                            className="rounded-md p-2 hover:bg-slate-100"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}
                {/* Navigation */}
                <nav className="flex-1 space-y-2 p-4" onClick={() => { if (window.innerWidth < 1024) { onClose(); }}}>
                    <SidebarItem to="/dashboard" icon={LayoutDashboard} collapsed={collapsed}>
                        Dashboard
                    </SidebarItem>
                    <SidebarItem to="/users" icon={Users} collapsed={collapsed}>
                        Users
                    </SidebarItem>
                    <SidebarItem to="/settings" icon={Settings} collapsed={collapsed}>
                        Settings
                    </SidebarItem>
                </nav>
            </aside>
        </>
    );
}