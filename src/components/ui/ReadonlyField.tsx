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
            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>

            <div className="w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-600 cursor-not-allowed">
                {value}
            </div>

            {helperText && (
                <p className="text-xs text-slate-500">
                    {helperText}
                </p>
            )}
        </div>
    );
}