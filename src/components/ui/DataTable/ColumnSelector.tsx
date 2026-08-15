import { Settings2 } from 'lucide-react';
import type { DataTableColumn } from './types';
import Dropdown from '@/components/ui/Dropdown';

interface ColumnSelectorProps<T extends object> {
    columns: DataTableColumn<T>[];
    visibleColumns: Record<string, boolean>;
    onVisibilityChange: (key: string, visible: boolean) => void;
}

export default function ColumnSelector<T extends object>({
    columns,
    visibleColumns,
    onVisibilityChange,
}: ColumnSelectorProps<T>) {
    return (
        <Dropdown
            trigger={
                <Settings2
                    size={18}
                    aria-label="Columns"
                />
            }
        >
            <div className="w-54 max-w-[calc(100vw-2rem)] overflow-hidden p-2">
                <div className="mb-2 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Columns
                </div>

                <div className="max-h-64 overflow-y-auto">
                    {columns.map((column) => (
                        <label
                            key={column.key}
                            className="flex w-full cursor-pointer items-start gap-2 rounded-control px-2 py-2 text-sm text-foreground transition-colors hover:bg-surface-hover"
                        >
                            <input
                                type="checkbox"
                                checked={visibleColumns[column.key] !== false}
                                onChange={(event) =>
                                    onVisibilityChange(
                                        column.key,
                                        event.target.checked,
                                    )
                                }
                                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary"
                            />

                            <span className="min-w-0 max-w-full flex-1 whitespace-normal wrap-break-word text-foreground">
                                {column.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </Dropdown>
    );
}