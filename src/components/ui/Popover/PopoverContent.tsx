import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';
import { usePopover } from './PopoverContext';

type PopoverPlacement =
    | 'bottom-start'
    | 'bottom-end'
    | 'top-start'
    | 'top-end';

interface Props {
    children: ReactNode;
    placement?: PopoverPlacement;
    className?: string;
}

export default function PopoverContent({
    children,
    placement = 'bottom-end',
    className,
}: Props) {
    const { open } = usePopover();

    const placementClass = {
        'bottom-start': 'left-0 top-full mt-2',
        'bottom-end': 'right-0 top-full mt-2',
        'top-start': 'bottom-full left-0 mb-2',
        'top-end': 'bottom-full right-0 mb-2',
    }[placement];

    const originClass = {
        'bottom-start': 'origin-top-left',
        'bottom-end': 'origin-top-right',
        'top-start': 'origin-bottom-left',
        'top-end': 'origin-bottom-right',
    }[placement];

    return (
        <div
            className={cn(
                'absolute z-50 w-64',
                placementClass,
                'overflow-hidden rounded-xl',
                'bg-[var(--surface)]',
                'shadow-[0_12px_40px_rgba(15,23,42,0.15)]',
                'ring-1 ring-[var(--border)]',
                originClass,
                'transition-all duration-150 ease-out',
                open
                    ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                    : 'pointer-events-none -translate-y-1 scale-95 opacity-0',

                className,
            )}
        >
            {children}
        </div>
    );
}