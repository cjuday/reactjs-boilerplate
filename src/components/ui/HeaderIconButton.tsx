import type { ReactNode } from 'react';

interface HeaderIconButtonProps {
    title: string;
    children: ReactNode;
    onClick?: () => void;
}

export default function HeaderIconButton({ title, children, onClick }: HeaderIconButtonProps) {
    return (
        <button
            type="button"
            title={title}
            onClick={onClick}
            className="rounded-control p-2 text-muted transition-all duration-200 hover:bg-surface-hover hover:text-foreground"
        >
            {children}
        </button>
    );
}