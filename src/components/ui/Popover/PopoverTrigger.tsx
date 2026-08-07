import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

import { usePopover } from './PopoverContext';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function PopoverTrigger({ children, className, onClick, ...props }: Props) {
    const { setOpen } = usePopover();

    return (
        <button
            type="button"
            {...props}
            className={cn('inline-flex items-center', className)}
            onClick={(event) => {
                event.stopPropagation();
                onClick?.(event);
                setOpen((value) => !value);
            }}
        >
            {children}
        </button>
    );
}