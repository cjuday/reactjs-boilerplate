interface ReadonlyFieldProps {
    label: string;
    value: string;
    helperText?: string;
}

export default function ReadonlyField({
    label,
    value,
    helperText,
}: ReadonlyFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
                {label}
            </label>

            <div className="w-full rounded-control border border-border bg-surface-hover px-3 py-2 text-sm text-muted cursor-not-allowed">
                {value}
            </div>

            {helperText && (
                <p className="text-xs text-muted">
                    {helperText}
                </p>
            )}
        </div>
    );
}