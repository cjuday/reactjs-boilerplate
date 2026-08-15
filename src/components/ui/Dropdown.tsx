import { type PropsWithChildren, useEffect, useRef, useState } from 'react';

interface Props {
    trigger: React.ReactNode;
}

export default function Dropdown({
    trigger,
    children,
}: PropsWithChildren<Props>) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                ref.current &&
                !ref.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
            );
        };
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-control border border-border bg-surface text-foreground transition-colors hover:bg-surface-hover"
                title="Columns"
            >
                {trigger}
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-max min-w-40 max-w-[calc(100vw-2rem)] rounded-control border border-border bg-surface shadow-popover">
                    {children}
                </div>
            )}
        </div>
    );
}