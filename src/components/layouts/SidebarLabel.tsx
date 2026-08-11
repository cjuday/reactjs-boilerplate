import {
    ChevronLeft,
    ChevronRight,
    X,
} from 'lucide-react';

import SidebarNode from './SidebarNode';
import { sidebarMenu } from './sidebar-menu';

interface SidebarProps {
    open: boolean;
    collapsed: boolean;
    onClose: () => void;
    onCollapse: () => void;
}

export default function Sidebar({
    open,
    collapsed,
    onClose,
    onCollapse,
}: SidebarProps) {
    return (
        <>
            {/* Mobile Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/30 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex h-full flex-col bg-surface shadow-sidebar
                    transition-all duration-300
                    ${open ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:translate-x-0
                    ${collapsed ? 'lg:w-20' : 'lg:w-60'}
                    w-60
                `}
            >
                {/* Collapse Button */}
                <button
                    type="button"
                    onClick={onCollapse}
                    className="absolute -right-4 top-24 z-50 hidden h-8 w-8 items-center justify-center rounded-full border border-b border-border bg-surface shadow-control transition hover:bg-surface-hover lg:flex"
                >
                    {collapsed ? (
                        <ChevronRight size={16} />
                    ) : (
                        <ChevronLeft size={16} />
                    )}
                </button>

                {/* Mobile Close */}
                {open && (
                    <div className="flex justify-end border-b border-border  p-2 lg:hidden">
                        <button
                            onClick={onClose}
                            className="rounded-control p-2 hover:bg-surface-hover"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}

                {/* Navigation */}
                <nav
                    className="flex-1 space-y-1 overflow-y-auto p-4"
                >
                    {sidebarMenu.map((item) => (
                        <SidebarNode
                            key={item.id}
                            item={item}
                            collapsed={collapsed}
                            onNavigate={onClose}
                        />
                    ))}
                </nav>
            </aside>
        </>
    );
}