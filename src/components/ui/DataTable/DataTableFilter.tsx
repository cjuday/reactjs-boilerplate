import { Check, Filter, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';

import type { DataTableFilter as FilterConfig } from './types';

interface DataTableFilterProps {
    config: FilterConfig;
    value: unknown;
    onChange: (value: unknown) => void;
    onClear: () => void;
}

export default function DataTableFilter({
    config,
    value,
    onChange,
    onClear,
}: DataTableFilterProps) {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({
        top: 0,
        left: 0,
    });

    const triggerRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open || !triggerRef.current) {
            return;
        }

        const updatePosition = () => {
            const rect =
                triggerRef.current!.getBoundingClientRect();

            setPosition({
                top: rect.bottom + 8,
                left: rect.right - 224,
            });
        };

        updatePosition();

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener(
                'resize',
                updatePosition,
            );

            window.removeEventListener(
                'scroll',
                updatePosition,
                true,
            );
        };
    }, [open]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                containerRef.current &&
                !containerRef.current.contains(target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside,
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
            );
        };
    }, []);

    if (config.type !== 'select') {
        return null;
    }

    const selectedValue =
        value === undefined || value === null
            ? ''
            : String(value);

    const hasValue = selectedValue !== '';

    const handleSelect = (nextValue: string) => {
        onChange(nextValue);
        setOpen(false);
    };

    const handleClear = () => {
        onClear();
        setOpen(false);
    };

    const dropdown = (
        <div
            ref={containerRef}
            className="fixed z-[9999] w-56 rounded-control border border-border bg-surface p-3 shadow-popover"
            style={{
                top: position.top,
                left: Math.max(8, position.left),
            }}
        >
            <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Filter
                </span>

                {hasValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
                    >
                        <X size={13} />
                        Clear
                    </button>
                )}
            </div>

            <div className="space-y-1">
                <button
                    type="button"
                    onClick={handleClear}
                    className={`flex w-full items-center justify-between rounded-control px-2 py-2 text-left text-sm transition-colors ${
                        !hasValue
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-surface-hover'
                    }`}
                >
                    <span>All</span>

                    {!hasValue && <Check size={15} />}
                </button>

                {config.options?.map((option) => {
                    const selected =
                        selectedValue === option.value;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                                handleSelect(option.value)
                            }
                            className={`flex w-full items-center justify-between rounded-control px-2 py-2 text-left text-sm transition-colors ${
                                selected
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-foreground hover:bg-surface-hover'
                            }`}
                        >
                            <span>{option.label}</span>

                            {selected && (
                                <Check size={15} />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <>
            <div>
                <button
                    ref={triggerRef}
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className={`flex h-7 w-7 items-center justify-center rounded-control border transition-colors ${
                        hasValue
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-surface text-muted hover:bg-surface-hover'
                    }`}
                    title="Filter"
                >
                    <Filter size={14} />
                </button>
            </div>

            {open &&
                createPortal(
                    dropdown,
                    document.body,
                )}
        </>
    );
}