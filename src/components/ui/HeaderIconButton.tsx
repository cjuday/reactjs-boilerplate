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
            className="rounded-lg p-2 text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
        >
            {children}
        </button>
    );
}