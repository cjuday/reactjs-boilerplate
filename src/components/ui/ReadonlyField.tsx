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
            <label className="text-sm font-medium text-[var(--foreground)]">
                {label}
            </label>

            <div className="w-full rounded-md border text-[var(--border)] text-[var(--foreground)] px-3 py-2 text-sm text-[var(--muted-foreground)] cursor-not-allowed">
                {value}
            </div>

            {helperText && (
                <p className="text-xs text-[var(--muted-foreground)]">
                    {helperText}
                </p>
            )}
        </div>
    );
}