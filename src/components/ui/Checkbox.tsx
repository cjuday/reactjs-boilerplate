import type { UseFormRegisterReturn } from 'react-hook-form';

interface CheckboxProps {
    id?: string;
    label: string;
    registration: UseFormRegisterReturn;
    disabled?: boolean;
}

export default function Checkbox({ id, label, registration, disabled = false }: CheckboxProps) {
    return (
        <label htmlFor={id ?? registration.name} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
                id={id ?? registration.name}
                type="checkbox"
                disabled={disabled}
                className="h-4 w-4 rounded border-[var(--border)] text-blue-600 focus:ring-[var(--primary)] disabled:cursor-not-allowed"
                {...registration}
            />
            <span>{label}</span>
        </label>
    );
}