import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useEffect } from 'react';
import type { DataTableColumn, DataTableQuery, DataTableRowAction } from './types';
import { useDataTable } from './use-data-table';
import DataTableToolbar from './DataTableToolbar';
import DataTablePagination from './DataTablePagination';
import DataTableFilter from './DataTableFilter';
import DataTableRowActions from './DataTableRowActions';

interface DataTableProps<T extends object> {
    columns: DataTableColumn<T>[];
    data: T[];
    loading?: boolean;
    emptyMessage?: string;
    storageKey?: string;
    initialLimit?: number;
    showSerialNumber?: boolean;
    onQueryChange?: (query: DataTableQuery) => void;
    total?: number;
    totalPages?: number;
    onExport?: (query: DataTableQuery) => void;
    exportLoading?: boolean;
    rowActions?: DataTableRowAction<T>[];
}

export default function DataTable<T extends object>({
    columns,
    data,
    loading = false,
    emptyMessage = 'No records found.',
    storageKey,
    initialLimit = 10,
    showSerialNumber = false,
    onQueryChange,
    total = 0,
    totalPages = 1,
    onExport,
    exportLoading = false,
    rowActions,
}: DataTableProps<T>) {
    const {
    query,
    setSearch,
    setSort,
    setPage,
    setLimit,
    setFilter,
    clearFilter,
    visibleColumns,
    setColumnVisibility,
    activeColumns,
} = useDataTable(
    columns,
    storageKey,
    initialLimit,
);

    const hasRowActions = rowActions && rowActions.length > 0;

    
    useEffect(() => {
        onQueryChange?.(query);
    }, [query, onQueryChange]);

    const handleSort = (column: DataTableColumn<T>) => {
        if (!column.sortable) {
            return;
        }

        if (query.sortBy !== column.key) {
            setSort(column.key, 'asc');
            return;
        }

        setSort(
            column.key,
            query.sortOrder === 'asc' ? 'desc' : 'asc',
        );
    };

    const columnCount = activeColumns.length + (showSerialNumber ? 1 : 0) + (hasRowActions ? 1 : 0);

    const getSerialNumber = (rowIndex: number) => {
        return (
            (query.page - 1) * query.limit +
            rowIndex +
            1
        );
    };

    return (
        <div className="w-full overflow-visible rounded-control border border-border bg-surface">
            <DataTableToolbar
                columns={columns}
                visibleColumns={visibleColumns}
                onVisibilityChange={setColumnVisibility}
                search={query.search}
                onSearchChange={setSearch}
                onExport={() =>
                    onExport?.({
                        ...query,
                        columns: activeColumns.map(
                            (column) => column.key,
                        ),
                    })
                }
                exportLoading={exportLoading}
            />

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                    <thead className="border-b border-border bg-surface">
                        <tr>
                            {showSerialNumber && (
                                <th className="w-16 border-r border-border px-4 py-3 font-semibold text-foreground">
                                    #
                                </th>
                            )}

                            {activeColumns.map((column) => {
                                const isSorted =
                                    query.sortBy === column.key;

                                return (
                                    <th
                                        key={column.key}
                                        className="whitespace-nowrap border-r border-border px-4 py-3 font-semibold text-foreground last:border-r-0"
                                    >
                                        <div className="flex w-full items-center justify-between gap-3">
                                            <div className="flex items-center gap-2">
                                                {column.sortable ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSort(column)}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <span>{column.label}</span>

                                                        {!isSorted && (
                                                            <ArrowUpDown
                                                                size={15}
                                                                className="text-muted"
                                                            />
                                                        )}

                                                        {isSorted &&
                                                            query.sortOrder === 'asc' && (
                                                                <ArrowUp
                                                                    size={15}
                                                                    className="text-primary"
                                                                />
                                                            )}

                                                        {isSorted &&
                                                            query.sortOrder === 'desc' && (
                                                                <ArrowDown
                                                                    size={15}
                                                                    className="text-primary"
                                                                />
                                                            )}
                                                    </button>
                                                ) : (
                                                    <span>{column.label}</span>
                                                )}
                                            </div>

                                            {column.filter && (
                                                <DataTableFilter
                                                    config={column.filter}
                                                    value={query.filters[column.key]}
                                                    onChange={(value) =>
                                                        setFilter(column.key, value)
                                                    }
                                                    onClear={() =>
                                                        clearFilter(column.key)
                                                    }
                                                />
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                            {hasRowActions && (
                                <th className="w-16 border-l border-border px-4 py-3 text-center font-semibold text-foreground">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={Math.max(
                                        columnCount,
                                        1,
                                    )}
                                    className="px-4 py-10 text-center text-muted"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={Math.max(
                                        columnCount,
                                        1,
                                    )}
                                    className="px-4 py-10 text-center text-muted"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={String(rowIndex)}
                                    className="border-b border-border"
                                >
                                    {showSerialNumber && (
                                        <td className="border-r border-border px-4 py-3 text-foreground">
                                            {getSerialNumber(
                                                rowIndex,
                                            )}
                                        </td>
                                    )}

                                    {activeColumns.map((column) => (
                                        <td
                                            key={column.key}
                                            className="whitespace-nowrap border-r border-border px-4 py-3 text-custom-gray last:border-r-0"
                                        >
                                            {column.render
                                                ? column.render(
                                                      row[column.key],
                                                      row,
                                                  )
                                                : String(
                                                      row[column.key] ??
                                                          '—',
                                                  )}
                                        </td>
                                    ))}
                                    {hasRowActions && (
                                        <td className="border-l border-border px-4 py-3">
                                            <DataTableRowActions
                                                row={row}
                                                actions={rowActions}
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <DataTablePagination
                page={query.page}
                limit={query.limit}
                total={total}
                totalPages={totalPages}
                onPageChange={setPage}
                onLimitChange={setLimit}
            />
        </div>
    );
}