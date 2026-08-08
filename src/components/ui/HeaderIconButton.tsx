import type { ReactNode } from 'react';

interface HeaderIconButtonProps {
    title: string;
    children: ReactNode;
    onClick?: () => void;
}

export default function HeaderIconButton({
    title,
    children,
    onClick,
}: HeaderIconButtonProps) {
    return (
        <button
            type="button"
            title={title}
            onClick={onClick}
            className="rounded-lg p-2 text-[var(--muted-foreground)] transition-all duration-200 hover:text-[var(--foreground)] hover:text-[var(--foreground)]"
        >
            {children}
        </button>
    );
}