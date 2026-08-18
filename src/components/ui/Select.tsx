import { useEffect, useMemo, useRef, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Check, ChevronDown, Search } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  id?: string;
  label?: string;
  options: SelectOption[];

  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;

  registration?: UseFormRegisterReturn;

  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;

  loading?: boolean;
  disabled?: boolean;
  required?: boolean;

  error?: string;
  helperText?: string;

  labelPosition?: "left" | "top" | "overlap";
}

export default function Select({
  id,
  label,
  options,
  value,
  defaultValue = "",
  onChange,
  registration,

  placeholder = "Select an option",
  searchable = false,
  searchPlaceholder = "Search...",

  loading = false,
  disabled = false,
  required = false,

  error,
  helperText,

  labelPosition = "overlap",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const searchRef = useRef<HTMLInputElement>(null);

  const selectedValue = value !== undefined ? value : internalValue;

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const filteredOptions = useMemo(() => {
    if (!searchable || !search.trim()) {
      return options;
    }

    const query = search.toLowerCase();

    return options.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [options, search, searchable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (open && searchable) {
      searchRef.current?.focus();
    }
  }, [open, searchable]);

  const handleSelect = (option: SelectOption) => {
    if (disabled || loading) {
      return;
    }

    if (value === undefined) {
      setInternalValue(option.value);
    }

    onChange?.(option.value);

    registration?.onChange({
      target: {
        name: registration.name,
        value: option.value,
      },
    });

    setOpen(false);
    setSearch("");
  };

  const handleOpen = () => {
    if (disabled || loading) {
      return;
    }

    setOpen((prev) => !prev);
    setSearch("");
  };

  const labelElement = label ? (
    <label htmlFor={id} className="block text-sm font-medium text-foreground">
      {label}

      {required && <span className="ml-1 text-danger">*</span>}
    </label>
  ) : null;

  const selectElement = (
    <div ref={containerRef} className="relative">
      {/*
       * Select button
       */}
      <button
        id={id}
        type="button"
        disabled={disabled || loading}
        onClick={handleOpen}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={!!error}
        className={[
          "flex w-full items-center",
          "justify-between",
          "rounded-none",
          "border-0 border-b",
          "border-border",
          "bg-surface",
          "px-0 py-2",
          "text-sm text-custom-gray",
          "outline-none transition",
          "focus:border-b-primary",
          "focus:ring-0",

          disabled || loading
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer",

          error ? "border-b-danger focus:border-b-danger" : "",
        ].join(" ")}
      >
        <span className="text-custom-gray">
          {loading ? "Loading..." : (selectedOption?.label ?? placeholder)}
        </span>

        <ChevronDown
          size={18}
          className={[
            "shrink-0 text-muted right-3",
            "transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {/*
       * Dropdown
       */}
      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-control border border-border bg-surface shadow-card">
          {searchable && (
            <div className="border-b border-border p-2">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-control border border-border bg-surface py-2 pl-9 pr-3 text-sm text-custom-gray outline-none focus:border-border focus:ring-0"
                />
              </div>
            </div>
          )}

          <div role="listbox" className="max-h-60 overflow-y-auto py-1 text-custom-gray">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm">
                No options found.
              </div>
            ) : (
              filteredOptions.map((option) => {
                const selected = option.value === selectedValue;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => handleSelect(option)}
                    className={[
                      "flex w-full",
                      "items-center",
                      "justify-between",
                      "px-3 py-2",
                      "text-left text-base",
                      "hover:bg-surface-hover",

                      selected
                        ? "bg-surface-hover"
                        : "",
                    ].join(" ")}
                  >
                    <span>{option.label}</span>

                    {selected && <Check size={16} className="shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-sm text-danger">{error}</p>}

      {!error && helperText && (
        <p className="mt-1 text-xs text-muted">{helperText}</p>
      )}
    </div>
  );

  /*
   * Overlapping label
   */
  if (labelPosition === "overlap") {
    return (
      <div className="space-y-2">
        <div className="relative">
          {selectElement}

          {label && (
            <label
              htmlFor={id}
              className={[
                "pointer-events-none",
                "absolute left-0 -top-5",
                "z-10 pr-1",
                "bg-surface",
                "text-base",
                "text-custom-blue",
              ].join(" ")}
            >
              {label}

              {required && <span className="ml-1 text-danger">*</span>}
            </label>
          )}
        </div>
      </div>
    );
  }

  /*
   * Label above
   */
  if (labelPosition === "top") {
    return (
      <div className="space-y-2">
        {labelElement}
        {selectElement}
      </div>
    );
  }

  /*
   * Label on left
   */
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-3">{labelElement}</div>

        <div className="col-span-9">{selectElement}</div>
      </div>
    </div>
  );
}
