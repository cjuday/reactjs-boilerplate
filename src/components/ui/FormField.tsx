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
}

export default function FormField({ id, label, registration, error, type = 'text', placeholder, autoComplete, disabled = false, required = false }: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium text-[var(--foreground)]">
                {label}{' '}{required && (<span className="ml-1 text-red-500">*</span>)} 
            </label>

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
                className={error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                rightAdornment={
                isPassword && (
                    <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="flex h-full items-center text-gray-500 transition-colors hover:text-gray-700"
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
                <p className="text-sm text-red-600">
                {error}
                </p>
            )}
        </div>
    );
}