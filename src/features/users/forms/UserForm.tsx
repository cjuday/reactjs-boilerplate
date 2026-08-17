import { Button, FormField, ReadonlyField, Select } from '@/components/ui';
import { Controller, useFormContext } from 'react-hook-form';
import type { UserFormValues } from '../schemas/user-form.schema';
import { useGetRoleOptionsQuery } from '@/features/roles/api/rolesApi';

interface UserFormProps {
    mode: 'create' | 'edit';
    loading: boolean;
    submitLabel: string;
    email?: string;
    onCancel: () => void;
}

export default function UserForm({ mode, loading, submitLabel, email, onCancel }: UserFormProps) {
    const { data: roles = [], isLoading: rolesLoading } = useGetRoleOptionsQuery();

    const { register, control, formState: { errors } } = useFormContext<UserFormValues>();

    const roleOptions = roles.map((role) => ({
        label: role.name,
        value: role.id,
    }));

    const statusOptions = [
        {
            label: 'Active',
            value: 'true',
        },
        {
            label: 'Inactive',
            value: 'false',
        },
    ];

    return (
        <div className="space-y-5 rounded-card bg-surface p-6 shadow-card">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Full Name */}
                <FormField
                    label="Full Name"
                    required
                    placeholder="Enter full name"
                    autoComplete="name"
                    registration={register('name')}
                    error={errors.name?.message}
                />

                {/* Email */}
                {mode === 'edit' ? (
                    <ReadonlyField
                        label="Email"
                        value={email ?? ''}
                    />
                ) : (
                    <FormField
                        label="Email"
                        required
                        type="email"
                        placeholder="Enter email address"
                        autoComplete="email"
                        registration={register('email')}
                        error={errors.email?.message}
                    />
                )}

                {/* Phone Number */}
                <FormField
                    label="Phone Number"
                    required
                    placeholder="Enter phone number"
                    autoComplete="tel"
                    registration={register('phoneNumber')}
                    error={errors.phoneNumber?.message}
                />

                {/* Role */}
                <Controller
                    name="roleId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            id="roleId"
                            label="Role"
                            required
                            value={field.value}
                            onChange={field.onChange}
                            options={roleOptions}
                            searchable
                            placeholder={
                                rolesLoading
                                    ? 'Loading roles...'
                                    : 'Select a role'
                            }
                            disabled={
                                rolesLoading || loading
                            }
                            error={errors.roleId?.message}
                        />
                    )}
                />

                {/* Password */}
                <div>
                    <FormField
                        label="Password"
                        type="password"
                        placeholder={
                            mode === 'edit'
                                ? 'Enter new password'
                                : 'Enter password'
                        }
                        autoComplete="new-password"
                        registration={register('password')}
                        error={errors.password?.message}
                    />
                </div>

                {/* Confirm Password */}
                <FormField
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    registration={register('confirmPassword')}
                    error={
                        errors.confirmPassword?.message
                    }
                />

                {/* Account Status */}
                <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                        <Select
                            id="isActive"
                            label="Account Status"
                            value={
                                field.value
                                    ? 'true'
                                    : 'false'
                            }
                            onChange={(value) =>
                                field.onChange(
                                    value === 'true',
                                )
                            }
                            options={statusOptions}
                            disabled={loading}
                        />
                    )}
                />
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-2 pt-5">
                <Button
                    type="button"
                    variant="danger"
                    onClick={onCancel}
                    disabled={loading}
                    size="xs"
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    loading={loading}
                    size="xs"
                >
                    {submitLabel}
                </Button>
            </div>
        </div>
    );
}