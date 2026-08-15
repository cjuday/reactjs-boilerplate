import { Download, Search, LoaderCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import ColumnSelector from './ColumnSelector';
import type {
    DataTableColumn,
    DataTableQuery,
} from './types';

interface DataTableToolbarProps<T extends object> {
    columns: DataTableColumn<T>[];
    visibleColumns: Record<string, boolean>;
    onVisibilityChange: (key: string, visible: boolean) => void;
    search?: string;
    onSearchChange?: (value: string) => void;
    onExport?: () => void;
    exportLoading?: boolean;
}

export default function DataTableToolbar<T extends object>({
    columns,
    visibleColumns,
    onVisibilityChange,
    search = '',
    onSearchChange,
    onExport,
    exportLoading = false,
}: DataTableToolbarProps<T>) {
    return (
        <div className="flex flex-col gap-3 border-b border-border p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
                <Search
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted"
                />

                <Input
                    value={search}
                    onChange={(event) =>
                        onSearchChange?.(event.target.value)
                    }
                    placeholder="Search..."
                    className="pl-10 pr-10"
                />

                {search && (
                    <button
                        type="button"
                        onClick={() => onSearchChange?.('')}
                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2">
                <ColumnSelector
                    columns={columns}
                    visibleColumns={visibleColumns}
                    onVisibilityChange={onVisibilityChange}
                />

                <button
                    type="button"
                    onClick={onExport}
                    disabled={exportLoading}
                    className="flex h-9 w-9 items-center justify-center rounded-control border border-border bg-surface text-foreground transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50"
                    title={
                        exportLoading
                            ? 'Preparing Excel...'
                            : 'Download Excel'
                    }
                    aria-label="Download Excel"
                >
                    {exportLoading ? (
                        <LoaderCircle
                            size={18}
                            className="animate-spin"
                        />
                    ) : (
                        <Download size={18} />
                    )}
                </button>
            </div>
        </div>
    );
}