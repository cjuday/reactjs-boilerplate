interface ReadonlyFieldProps {
    label: string;
    value: string;
    helperText?: string;
    labelPosition?: 'left' | 'top';
    required?: boolean;
}

export default function ReadonlyField({ label, value, helperText, labelPosition = 'top', required = false }: ReadonlyFieldProps) {
    const fieldElement = (
        <>
            <div className="w-full cursor-not-allowed rounded-none border-0 border-b border-border bg-surface px-0 py-2 text-sm text-readonly-gray">
                {value}
            </div>

            {helperText && (<p className="mt-1 text-xs text-muted">{helperText}</p>)}
        </>
    );

    /*
     * Top
     */
    if (labelPosition === 'top') {
        return (
            <div className="space-y-2 pb-3">
                <div className="relative">
                    {fieldElement}

                    <label className="pointer-events-none absolute -top-5 left-0 z-10 bg-surface pr-1 text-base font-medium text-custom-blue">
                        {label} {required && (<span className="ml-1 text-danger">*</span>)}
                    </label>
                </div>
            </div>
        );
    }

    /*
     * Left
     */
    return (
        <div className="space-y-2">
            <div className="grid grid-cols-12 items-center gap-4">
                <div className="col-span-3">
                    <label className="block text-base font-medium text-custom-blue">
                        {label} {required && (<span className="ml-1 text-danger">*</span>)}
                    </label>
                </div>

                <div className="col-span-9">
                    {fieldElement}
                </div>
            </div>
        </div>
    );
}