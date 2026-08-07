import { type PropsWithChildren, useEffect, useRef, useState } from 'react';


interface Props {
    trigger: React.ReactNode;
}

export default function Dropdown({ trigger, children }: PropsWithChildren<Props>) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button type="button" onClick={() => setOpen((prev) => !prev)}>
                {trigger}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
                    {children}
                </div>
            )}
        </div>
    );
}