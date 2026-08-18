interface ReadonlyFieldProps {
    label: string;
    value: string;
    helperText?: string;
    labelPosition?: 'left' | 'top' | 'overlap';
}

export default function ReadonlyField({
    label,
    value,
    helperText,
    labelPosition = 'overlap',
}: ReadonlyFieldProps) {
    const labelElement = (
        <label className="block text-sm font-medium text-foreground">
            {label}
        </label>
    );

    const fieldElement = (
        <>
            <div className="w-full cursor-not-allowed rounded-none border-0 border-b border-border bg-surface px-0 py-2 text-sm text-readonly-gray">
                {value}
            </div>

            {helperText && (
                <p className="mt-1 text-xs text-muted">
                    {helperText}
                </p>
            )}
        </>
    );

    if (labelPosition === 'overlap') {
        return (
            <div className="space-y-2">
                <div className="relative">
                    {fieldElement}

                    <label
                        className="pointer-events-none absolute -top-5 left-0 z-10 bg-surface pr-1 text-base text-custom-blue"
                    >
                        {label}
                    </label>
                </div>
            </div>
        );
    }

    if (labelPosition === 'top') {
        return (
            <div className="space-y-2">
                {labelElement}
                {fieldElement}
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-12 items-center gap-4">
                <div className="col-span-3">
                    {labelElement}
                </div>

                <div className="col-span-9">
                    {fieldElement}
                </div>
            </div>
        </div>
    );
}