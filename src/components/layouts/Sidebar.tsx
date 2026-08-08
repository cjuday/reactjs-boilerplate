import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { sidebarMenu } from './sidebar-menu';
import SidebarNode from './SidebarNode';

interface SidebarProps {
    open: boolean;
    collapsed: boolean;
    onClose: () => void;
    onCollapse: () => void;
    level?: number;
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
                    h-full bg-[var(--surface)] shadow-sm transition-all duration-300
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
                    className="absolute -right-4 top-4 z-50 hidden h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-md transition-all duration-200 hover:scale-110 hover:text-[var(--foreground)] active:scale-95 lg:flex"
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
                            className="rounded-md p-2 hover:text-[var(--foreground)]"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}
                {/* Navigation */}
                 <nav
                    className="flex-1 space-y-1 p-4"
                >
                    {sidebarMenu.map((item) => (
                        <SidebarNode
                            key={item.label}
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