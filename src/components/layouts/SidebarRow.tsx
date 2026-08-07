import { ChevronDown, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/shared/utils/cn';

interface Props {
    icon: LucideIcon;
    label: string;
    active: boolean;
    collapsed: boolean;
    hasChildren: boolean;
    expanded: boolean;
    level: number;
    isFlyout?: boolean;
}

export default function SidebarRow({ icon: Icon, label, active, collapsed, hasChildren, expanded, level, isFlyout = false }: Props) {
    return (
        <div
            className="flex flex-1 items-center"
            style={{
                paddingLeft: `${16 + level * 8}px`,
            }}
        >
            {/* Icon + Label */}
            <div className="flex flex-1 items-center gap-3 min-w-0">
                <div className="flex w-6 shrink-0 justify-center">
                    <Icon
                        size={17}
                        className={cn(
                            'transition-colors duration-200',
                            active
                                ? 'text-blue-600'
                                : 'text-slate-500 group-hover:text-[var(--foreground)]',
                        )}
                    />
                </div>

                {!collapsed && (
                    <span className="truncate">
                        {label}
                    </span>
                )}
            </div>

            {/* Chevron */}
            {!collapsed && hasChildren && (
                isFlyout ? (
                    <ChevronRight
                        size={16}
                        className="ml-2 shrink-0"
                    />
                ) : (
                    <ChevronDown
                        size={16}
                        className={cn(
                            'ml-2 shrink-0 transition-transform duration-200',
                            expanded && 'rotate-180',
                        )}
                    />
                )
            )}
        </div>
    );
}