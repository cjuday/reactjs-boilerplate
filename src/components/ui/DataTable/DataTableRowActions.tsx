import type { DataTableRowAction } from "./types";
import React from "react";
import { cn } from "@/shared/utils/cn";

interface DataTableRowActionsProps<T> {
  row: T;
  actions: DataTableRowAction<T>[];
}

export default function DataTableRowActions<T>({
  row,
  actions,
}: DataTableRowActionsProps<T>) {
  return (
    <div className="flex items-center justify-end gap-1">
      {actions.map((action, index) => {
        const visible = action.visible?.(row) ?? true;

        if (!visible) {
          return null;
        }

        const disabled = action.disabled?.(row) ?? false;

        const hasVisibleActionAfter = actions
          .slice(index + 1)
          .some((nextAction) => nextAction.visible?.(row) ?? true);

        return (
          <React.Fragment key={action.label}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => action.onClick(row)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-control transition-colors",
                disabled && "cursor-not-allowed opacity-40",
                action.className
              )}
              title={action.label}
              aria-label={action.label}
            >
              {action.icon}
            </button>

            {hasVisibleActionAfter && (
              <span className="text-muted">|</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}