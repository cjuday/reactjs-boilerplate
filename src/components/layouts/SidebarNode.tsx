import { useEffect, useMemo, useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import type { SidebarMenuItem } from './types/sidebar.types';
import { cn } from '@/shared/utils/cn';
import SidebarRow from './SidebarRow';
import SidebarFlyout from './SidebarFlyout';

interface Props {
    item: SidebarMenuItem;
    collapsed: boolean;
    isFlyout?: boolean;
    level?: number;
    onNavigate?: () => void;
}

export default function SidebarNode({ item, collapsed, level = 0, isFlyout = false, onNavigate }: Props) {
    const location = useLocation();
    const hasChildren = Boolean(item.children?.length);
    const containerRef = useRef<HTMLDivElement>(null);

    const hasActiveChild = useMemo(() => {
        const search = (items: SidebarMenuItem[]): boolean =>
            items.some((child) => {
                if (child.to === location.pathname) {
                    return true;
                }

                return child.children
                    ? search(child.children)
                    : false;
            });

        return search(item.children ?? []);
    }, [item.children, location.pathname]);

    const isCurrent = item.to === location.pathname;
    const active = isCurrent || hasActiveChild;
    const [expanded, setExpanded] = useState(active);
    const [flyoutOpen, setFlyoutOpen] = useState(false);
    const highlighted = active || (collapsed && flyoutOpen);

    useEffect(() => {
        if (active) {
            setExpanded(true);
        }
    }, [active]);

    const groupClasses = cn(
        'group relative flex h-10 w-full items-center rounded-control text-left text-sm font-medium transition-all duration-200',
        highlighted ? 'bg-primary-soft text-primary' : 'text-foreground hover:bg-surface-hover',
    );

    useEffect(() => {
        if (!flyoutOpen) {
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setFlyoutOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [flyoutOpen]);

    useEffect(() => {
        setFlyoutOpen(false);
    }, [collapsed]);

    const handleNavigate = () => {
        setFlyoutOpen(false);
        onNavigate?.();
    };

    useEffect(() => {
        setFlyoutOpen(false);
        setExpanded(active);
    }, [location.pathname, active]);

    return (
        <div ref={containerRef} className="relative space">
            {hasChildren ? (
                <button
                    type="button"
                    onClick={() => {
                        if (collapsed || isFlyout) {
                            setFlyoutOpen((value) => !value);
                        } else {
                            setExpanded((value) => !value);
                        }
                    }}
                    className={groupClasses}
                >
                    <div
                        className={cn(
                            'absolute left-1 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full transition-all duration-200',
                            highlighted ? 'bg-primary-muted' : 'bg-transparent',
                        )}
                    />

                    <div className="flex flex-1 pr-4">
                        <SidebarRow
                            icon={item.icon}
                            label={item.label}
                            active={highlighted}
                            collapsed={collapsed}
                            hasChildren
                            expanded={expanded}
                            level={level}
                            isFlyout={isFlyout}
                        />
                    </div>
                </button>
            ) : (
                <NavLink
                    to={item.to!}
                    title={collapsed ? item.label : undefined}
                    onClick={handleNavigate}
                    className={({ isActive }) =>
                        cn(
                            'group relative flex h-10 items-center rounded-control text-sm font-medium transition-all duration-200',
                            isActive ? 'bg-primary-soft text-primary' : 'text-foreground hover:bg-surface-hover',
                        )
                    }
                >
                    {({ isActive }) => (
                        <>
                            <div
                                className={cn(
                                    'absolute left-1 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full transition-all duration-200',
                                    isActive ? 'bg-primary' : 'bg-transparent',
                                )}
                            />

                            <div className="flex flex-1 pr-4">
                                <SidebarRow
                                    icon={item.icon}
                                    label={item.label}
                                    active={isActive}
                                    collapsed={collapsed}
                                    hasChildren={false}
                                    expanded={false}
                                    level={level}
                                    isFlyout={isFlyout}
                                />
                            </div>
                        </>
                    )}
                </NavLink>
            )}

            {hasChildren && (
                <>
                    {/* Expanded sidebar */}
                    {!collapsed && !isFlyout && (
                        <div
                            className={cn(
                                'overflow-hidden transition-all duration-300',
                                expanded
                                    ? 'max-h-125 opacity-100'
                                    : 'max-h-0 opacity-0',
                            )}
                        >
                            <div className="mt-1 space-y-1">
                                {item.children?.map((child) => (
                                    <SidebarNode
                                        key={child.id}
                                        item={child}
                                        collapsed={false}
                                        level={level + 1}
                                        onNavigate={handleNavigate}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Flyout */}
                    {(collapsed || isFlyout) && (
                        <SidebarFlyout
                            open={flyoutOpen}
                            items={item.children ?? []}
                            onNavigate={handleNavigate}
                        />
                    )}
                </>
            )}
        </div>
    );
}