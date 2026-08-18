import { Button, FormField, ReadonlyField, Select } from "@/components/ui";
import { Controller, useFormContext } from "react-hook-form";
import type { UserFormValues } from "../schemas/user-form.schema";
import { useGetRoleOptionsQuery } from "@/features/roles/api/rolesApi";

interface UserFormProps {
  mode: "create" | "edit";
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
  const { data: roles = [], isLoading: rolesLoading } =
    useGetRoleOptionsQuery();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<UserFormValues>();

  const roleOptions = roles.map((role) => ({
    label: role.name,
    value: role.id,
  }));

  const statusOptions = [
    {
      label: "Active",
      value: "true",
    },
    {
      label: "Inactive",
      value: "false",
    },
  ];

  return (
    <div className="space-y-5 rounded-card bg-surface p-6 shadow-card">
      <span className="text-arctic-blue-heavy text-xl leading-none">
        {mode=='edit' ? 'Edit User' : 'New User'}
      </span>
      <hr className="mt-1 pb-2 border-border" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Full Name */}
        <FormField
          label="Full Name"
          required
          placeholder="Enter full name"
          autoComplete="name"
          registration={register("name")}
          error={errors.name?.message}
          labelPosition="overlap"
        />

        {/* Email */}
        {mode === "edit" ? (
          <ReadonlyField label="Email" value={email ?? ""} />
        ) : (
          <FormField
            label="Email"
            required
            type="email"
            placeholder="Enter email address"
            autoComplete="email"
            registration={register("email")}
            error={errors.email?.message}
            labelPosition="overlap"
          />
        )}

        {/* Phone Number */}
        <FormField
          label="Phone Number"
          required
          placeholder="Enter phone number"
          autoComplete="tel"
          registration={register("phoneNumber")}
          error={errors.phoneNumber?.message}
          labelPosition="overlap"
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
              placeholder={rolesLoading ? "Loading roles..." : "Select a role"}
              disabled={rolesLoading || loading}
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
              mode === "edit" ? "Enter new password" : "Enter password"
            }
            autoComplete="new-password"
            registration={register("password")}
            error={errors.password?.message}
            labelPosition="overlap"
          />
        </div>

        {/* Confirm Password */}
        <FormField
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          labelPosition="overlap"
        />

        {/* Account Status */}
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <Select
              id="isActive"
              label="Account Status"
              value={field.value ? "true" : "false"}
              onChange={(value) => field.onChange(value === "true")}
              options={statusOptions}
              disabled={loading}
            />
          )}
        />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-12 justify-center gap-2 pt-5">
        <Button
          type="button"
          variant="danger"
          onClick={onCancel}
          disabled={loading}
          size="xs"
          className="col-span-6 lg:col-span-3 lg:col-start-4"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={loading}
          size="xs"
          variant="success"
          className="col-span-6 lg:col-span-3"
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
