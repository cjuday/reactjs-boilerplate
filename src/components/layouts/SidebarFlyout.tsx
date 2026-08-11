import { cn } from '@/shared/utils/cn';
import SidebarNode from './SidebarNode';
import type { SidebarMenuItem } from './types/sidebar.types';

interface Props {
    open: boolean;
    items: SidebarMenuItem[];
    onNavigate?: () => void;
}

export default function SidebarFlyout({ open, items, onNavigate }: Props) {
    if (!open) {
        return null;
    }

    return (
        <div
            className={cn(
                'absolute left-full top-0 z-50 ml-2',
                'w-56 rounded-control bg-surface',
                'shadow-popover',
            )}
        >
            <div className="space">
                {items.map((item) => (
                    <SidebarNode
                        key={item.id}
                        item={item}
                        collapsed={false}
                        isFlyout
                        level={0}
                        onNavigate={onNavigate}
                    />
                ))}
            </div>
        </div>
    );
}