import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
    open: boolean;
    title?: string;
    children: ReactNode;
    onClose?: () => void;
    showCloseButton?: boolean;
    closeOnEsc?: boolean;
    closeOnOutsideClick?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
};

export default function Modal({ open, title, children, onClose, showCloseButton = true, closeOnEsc = true, closeOnOutsideClick = true, size = 'md' }: ModalProps) {
    useEffect(() => {
        if (!open || !closeOnEsc) return;
        const listener = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose?.();
            }
        };
        window.addEventListener('keydown', listener);
        return () => window.removeEventListener('keydown', listener);
    }, [open, closeOnEsc, onClose]);

    useEffect(() => {
        if (!open) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => {
        if (closeOnOutsideClick) {
          onClose?.();
        }
      }}
    >
      <div
        className={`relative w-full rounded-xl bg-[var(--surface)] shadow-xl ${sizes[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold">
              {title}
            </h2>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}