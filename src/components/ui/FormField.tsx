import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Input from "./Input";

interface FormFieldProps {
  id?: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  labelPosition?: "left" | "top";
}

export default function FormField({
  id,
  label,
  registration,
  error,
  type = "text",
  placeholder,
  autoComplete,
  disabled = false,
  required = false,
  labelPosition = "top",
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const inputElement = (
    <Input
      id={id}
      type={isPassword ? (showPassword ? "text" : "password") : type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      disabled={disabled}
      aria-invalid={!!error}
      className={[
        "rounded-none border-0 border-b",
        "border-border bg-surface",
        "px-0",
        "focus:border-b-primary",
        "text-custom-gray",
        "focus:ring-0",
        error ? "border-b-danger focus:border-b-danger" : "",
      ].join(" ")}
      rightAdornment={
        isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="flex h-full items-center text-muted transition-colors hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )
      }
      {...registration}
    />
  );

  /*
   * Top
   */
  if (labelPosition === "top") {
    return (
      <div className="space-y-2 pb-3">
        <div className="relative">
          {inputElement}

          <label
            htmlFor={id}
            className={[
              "pointer-events-none absolute",
              "left-0 -top-5",
              "z-10 bg-surface",
              "pr-1 text-base font-medium",
              "text-custom-blue",
              "transition-colors",
              "peer-focus:text-primary",
            ].join(" ")}
          >
            {label} {required && (<span className="ml-1 text-danger">*</span>)}
          </label>

          {error && ( <p className="mt-1 text-sm text-danger">{error}</p>)}
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
          <label
            htmlFor={id}
            className="block text-base font-medium text-custom-blue"
          >
            {label} {required && (<span className="ml-1 text-danger">*</span>)}
          </label>
        </div>

        <div className="col-span-9">
          {inputElement}

          {error && (
            <p className="mt-1 text-sm text-danger">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}