import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { cn } from '@/shared/utils/cn';

interface Props {
    to: string;
    icon: LucideIcon;
    children: ReactNode;
    collapsed?: boolean;
    onClick?: () => void;
}

export default function SidebarItem({to, icon: Icon, children, collapsed = false, onClick }: Props) {
    return (
        <NavLink
            title={collapsed ? String(children) : undefined}
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
               cn('group flex rounded-lg py-2 text-sm font-medium transition-all duration-200',
                    collapsed ? 'justify-center px-2' : 'items-center gap-3 px-4',
                    isActive ? 'border-l-4 border-blue-600 bg-blue-50 text-blue-700' : 'border-l-4 border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                )
            }
        >
            {({ isActive }) => (
                <>
                <Icon
                    size={20}
                    className={cn(
                    'transition-colors duration-200',
                    isActive
                        ? 'text-blue-600'
                        : 'text-slate-500 group-hover:text-slate-700',
                    )}
                />
                    {!collapsed && (
                        <span className="truncate">
                            {children}
                        </span>
                    )}
                </>
            )}
        </NavLink>
    );
}