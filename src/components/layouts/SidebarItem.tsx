import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { cn } from '@/shared/utils/cn';

interface Props {
    to: string;
    icon: LucideIcon;
    children: ReactNode;
    onClick?: () => void;
}

export default function SidebarItem({to, icon: Icon, children, onClick }: Props) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
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
                    <span>{children}</span>
                </>
            )}
        </NavLink>
    );
}