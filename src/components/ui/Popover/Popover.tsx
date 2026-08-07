import { useEffect, useMemo, useRef, useState } from 'react';
import { PopoverContext } from './PopoverContext';

interface Props {
    children: React.ReactNode;
}

export default function Popover({ children }: Props) {
    const [open, setOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside,
        );

        document.addEventListener(
            'keydown',
            handleEscape,
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
            );

            document.removeEventListener(
                'keydown',
                handleEscape,
            );
        };
    }, []);

    const value = useMemo(
        () => ({ open, setOpen, close: () => setOpen(false) }),
        [open]
    );

    return (
        <PopoverContext.Provider value={value}>
            <div
                ref={containerRef}
                className="relative inline-flex"
            >
                {children}
            </div>
        </PopoverContext.Provider>
    );
}