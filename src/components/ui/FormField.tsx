import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import Input from './Input';

interface FormFieldProps {
    id?: string;
    label: string;
    registration: UseFormRegisterReturn;
    error?: string;
    type?: 'text' | 'email' | 'password' | 'number';
    placeholder?: string;
    autoComplete?: string;
    disabled?: boolean;
    required?: boolean;
    labelPosition?: 'left' | 'top';
}

export default function FormField({
    id,
    label,
    registration,
    error,
    type = 'text',
    placeholder,
    autoComplete,
    disabled = false,
    required = false,
    labelPosition = 'left',
}: FormFieldProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    const labelElement = (
        <label
            htmlFor={id}
            className="block text-sm font-medium text-foreground"
        >
            {label}
            {required && (
                <span className="ml-1 text-danger">*</span>
            )}
        </label>
    );

    const inputElement = (
        <>
            <Input
                id={id}
                type={
                    isPassword
                        ? showPassword
                            ? 'text'
                            : 'password'
                        : type
                }
                placeholder={placeholder}
                autoComplete={autoComplete}
                disabled={disabled}
                aria-invalid={!!error}
                className={
                    error
                        ? 'border-danger focus:border-danger focus:ring-danger/20'
                        : ''
                }
                rightAdornment={
                    isPassword && (
                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
                            className="flex h-full items-center text-muted transition-colors hover:text-foreground"
                            aria-label={
                                showPassword
                                    ? 'Hide password'
                                    : 'Show password'
                            }
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    )
                }
                {...registration}
            />

            {error && (
                <p className="mt-1 text-sm text-danger">
                    {error}
                </p>
            )}
        </>
    );

    if (labelPosition === 'top') {
        return (
            <div className="space-y-2">
                {labelElement}
                {inputElement}
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
                    {inputElement}
                </div>
            </div>
        </div>
    );
}