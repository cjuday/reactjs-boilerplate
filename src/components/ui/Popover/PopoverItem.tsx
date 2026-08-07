import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';
import { usePopover } from './PopoverContext';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    selected?: boolean;
}

export default function PopoverItem({
    children,
    selected = false,
    className,
    onClick,
    ...props
}: Props) {
    const { close } = usePopover();

    return (
        <button
            type="button"
            {...props}
            className={cn(
                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                selected
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-slate-100',

                className,
            )}
            onClick={(event) => {
                onClick?.(event);
                close();
            }}
        >
            {children}
        </button>
    );
}