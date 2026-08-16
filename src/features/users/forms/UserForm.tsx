import { Button, FormField, ReadonlyField } from '@/components/ui';
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

export default function UserForm({
    mode,
    loading,
    submitLabel,
    email,
    onCancel,
}: UserFormProps) {
    const {
        data: roles = [],
        isLoading: rolesLoading,
    } = useGetRoleOptionsQuery();

    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext<UserFormValues>();

    const roleId = watch('roleId');
    const isActive = watch('isActive');

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
                        helperText="Email address cannot be changed."
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
                <div>
                    <label
                        htmlFor="roleId"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                        Role
                        <span className="ml-1 text-danger">*</span>
                    </label>

                    <select
                        id="roleId"
                        {...register('roleId')}
                        value={roleId ?? ''}
                        disabled={rolesLoading || loading}
                        className="w-full rounded-control border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="">
                            {rolesLoading
                                ? 'Loading roles...'
                                : 'Select a role'}
                        </option>

                        {roles.map((role) => (
                            <option
                                key={role.id}
                                value={role.id}
                            >
                                {role.name}
                            </option>
                        ))}
                    </select>

                    {errors.roleId && (
                        <p className="mt-1 text-sm text-danger">
                            {String(errors.roleId.message)}
                        </p>
                    )}
                </div>

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

                    {mode === 'edit' && (
                        <p className="mt-1 text-sm text-muted">
                            Leave blank to keep the current password.
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <FormField
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    registration={register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                />

                {/* Account Status */}
                <div>
                    <label
                        htmlFor="isActive"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                        Account Status
                    </label>

                    <Controller
                        name="isActive"
                        control={control}
                        render={({ field }) => (
                            <select
                                id="isActive"
                                value={
                                    isActive === true
                                        ? 'true'
                                        : 'false'
                                }
                                onChange={(event) => {
                                    field.onChange(
                                        event.target.value === 'true',
                                    );
                                }}
                                disabled={loading}
                                className="w-full rounded-control border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="true">
                                    Active
                                </option>
                                <option value="false">
                                    Inactive
                                </option>
                            </select>
                        )}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-2 pt-5">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    loading={loading}
                >
                    {submitLabel}
                </Button>
            </div>
        </div>
    );
}