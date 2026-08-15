import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTablePaginationProps {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

export default function DataTablePagination({
    page,
    limit,
    total,
    totalPages,
    onPageChange,
    onLimitChange,
}: DataTablePaginationProps) {
    const start = total === 0 ? 0 : (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    const getPages = (): (number | 'ellipsis')[] => {
        if (totalPages <= 7) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1,
            );
        }

        const pages: (number | 'ellipsis')[] = [1];

        if (page > 3) {
            pages.push('ellipsis');
        }

        const startPage = Math.max(2, page - 1);
        const endPage = Math.min(totalPages - 1, page + 1);

        for (let current = startPage; current <= endPage; current++) {
            pages.push(current);
        }

        if (page < totalPages - 2) {
            pages.push('ellipsis');
        }

        pages.push(totalPages);

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted">
                Showing {start}–{end} of {total}
            </div>

            <div className="flex items-center gap-2">
                <select
                    value={limit}
                    onChange={(event) =>
                        onLimitChange(Number(event.target.value))
                    }
                    className="rounded-control border border-border bg-surface px-2 py-1.5 text-sm text-foreground focus:outline-none"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>

                <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    className="rounded-control border border-border p-2 text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                >
                    <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1">
                    {pages.map((item, index) =>
                        item === 'ellipsis' ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-1 text-muted"
                            >
                                …
                            </span>
                        ) : (
                            <button
                                key={item}
                                type="button"
                                onClick={() => onPageChange(item)}
                                className={
                                    item === page
                                        ? 'min-w-8 rounded-control bg-primary px-2 py-1.5 text-sm text-primary-foreground'
                                        : 'min-w-8 rounded-control px-2 py-1.5 text-sm text-foreground hover:bg-surface-hover'
                                }
                            >
                                {item}
                            </button>
                        ),
                    )}
                </div>

                <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className="rounded-control border border-border p-2 text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}