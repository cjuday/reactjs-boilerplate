import { AlertTriangle, X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    danger?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    loading = false,
    danger = true,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-card border border-border bg-surface shadow-card">
                <div className="flex items-start justify-between border-b border-border p-5">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
                            <AlertTriangle size={20} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                {title}
                            </h2>

                            <div className="mt-1 text-sm text-muted">
                                {message}
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="flex h-8 w-8 items-center justify-center rounded-control text-muted transition-colors hover:bg-surface-hover hover:text-foreground disabled:opacity-50"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex justify-end gap-2 p-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-control border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {cancelLabel}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={`rounded-control px-4 py-2 text-sm font-medium text-primary-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                            danger
                                ? 'bg-danger hover:bg-danger-hover'
                                : 'bg-primary hover:bg-primary-hover'
                        }`}
                    >
                        {loading ? 'Deleting...' : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}