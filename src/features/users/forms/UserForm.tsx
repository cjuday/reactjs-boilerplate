import { useFormContext } from 'react-hook-form';

import {
    Button,
    FormField,
    ReadonlyField,
} from '@/components/ui';

import type { UserEditFormValues } from '../schemas/user-edit.schema';

interface UserFormProps {
    mode: 'create' | 'edit';
    loading?: boolean;
    submitLabel?: string;
    email?: string;
    onCancel?: () => void;
}

export default function UserForm({
    mode,
    loading = false,
    submitLabel = 'Save Changes',
    email,
    onCancel,
}: UserFormProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext<UserEditFormValues>();

    return (
        <div className="rounded-card bg-surface p-6 shadow-card">
            <div className="space-y-5">
                <FormField
                    label="Full Name"
                    required
                    placeholder="Enter full name"
                    autoComplete="name"
                    registration={register('name')}
                    error={errors.name?.message}
                />

                {mode === 'edit' ? (
                    <ReadonlyField
                        label="Email"
                        value={email ?? ''}
                        helperText="Email address cannot be changed."
                    />
                ) : (
                    <FormField
                        label="Email"
                        required
                        placeholder="Enter email address"
                        autoComplete="email"
                        registration={register('email')}
                        error={errors.email?.message}
                    />
                )}

                <FormField
                    label="Phone Number"
                    required
                    placeholder="+8801712345678"
                    autoComplete="tel"
                    registration={register('phoneNumber')}
                    error={errors.phoneNumber?.message}
                />

                <div className="flex justify-end gap-2">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    )}

                    <Button
                        type="submit"
                        loading={loading}
                    >
                        {submitLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}