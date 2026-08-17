interface ReadonlyFieldProps {
    label: string;
    value: string;
    helperText?: string;
    labelPosition?: 'left' | 'top';
}

export default function ReadonlyField({
    label,
    value,
    helperText,
    labelPosition = 'left',
}: ReadonlyFieldProps) {
    const labelElement = (
        <label className="block text-sm font-medium text-foreground">
            {label}
        </label>
    );

    const fieldElement = (
        <>
            <div className="w-full cursor-not-allowed rounded-control border border-border bg-surface-hover px-3 py-2 text-sm text-muted">
                {value}
            </div>

            {helperText && (
                <p className="mt-1 text-xs text-muted">
                    {helperText}
                </p>
            )}
        </>
    );

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