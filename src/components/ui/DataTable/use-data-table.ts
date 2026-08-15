import { useEffect, useMemo, useState } from 'react';
import type {
    DataTableColumn,
    DataTableQuery,
    DataTableSortOrder,
} from './types';

export function useDataTable<T extends object>(
    columns: DataTableColumn<T>[],
    storageKey?: string,
    initialLimit = 20,
) {
    const defaultVisibility = useMemo(
        () =>
            Object.fromEntries(
                columns.map((column) => [
                    column.key,
                    column.visible !== false,
                ]),
            ),
        [columns],
    );

    const [visibleColumns, setVisibleColumns] =  useState<Record<string, boolean>>(defaultVisibility);
    const [filters, setFilters] = useState<Record<string, unknown>>({});

    const setFilter = (key: string, value: unknown) => {
        setQuery((current) => {
            const nextFilters = {
                ...current.filters,
            };

            if (
                value === undefined ||
                value === null ||
                value === ''
            ) {
                delete nextFilters[key];
            } else {
                nextFilters[key] = value;
            }

            return {
                ...current,
                page: 1,
                filters: nextFilters,
            };
        });
    };

    const clearFilter = (key: string) => {
        setQuery((current) => {
            const nextFilters = {
                ...current.filters,
            };

            delete nextFilters[key];

            return {
                ...current,
                page: 1,
                filters: nextFilters,
            };
        });
    };

    const [query, setQuery] = useState<DataTableQuery>({
        page: 1,
        limit: initialLimit,
        search: '',
        filters: {},
    });

    useEffect(() => {
        if (!storageKey) {
            return;
        }

        const saved = localStorage.getItem(storageKey);

        if (!saved) {
            return;
        }

        try {
            const parsed = JSON.parse(saved);

            setVisibleColumns({
                ...defaultVisibility,
                ...parsed,
            });
        } catch {
            localStorage.removeItem(storageKey);
        }
    }, [storageKey, defaultVisibility]);

    useEffect(() => {
        if (!storageKey) {
            return;
        }

        localStorage.setItem(
            storageKey,
            JSON.stringify(visibleColumns),
        );
    }, [storageKey, visibleColumns]);

    const setColumnVisibility = (
        key: string,
        visible: boolean,
    ) => {
        setVisibleColumns((current) => ({
            ...current,
            [key]: visible,
        }));
    };

    const activeColumns = useMemo(
        () =>
            columns.filter(
                (column) => visibleColumns[column.key] !== false,
            ),
        [columns, visibleColumns],
    );

    const setSearch = (search: string) => {
        setQuery((current) => ({
            ...current,
            search,
            page: 1,
        }));
    };

    const setSort = (
        sortBy: string,
        sortOrder: DataTableSortOrder,
    ) => {
        setQuery((current) => ({
            ...current,
            sortBy,
            sortOrder,
            page: 1,
        }));
    };

    const setPage = (page: number) => {
        setQuery((current) => ({
            ...current,
            page,
        }));
    };

    const setLimit = (limit: number) => {
        setQuery((current) => ({
            ...current,
            limit,
            page: 1,
        }));
    };

    return {
        query,
        setQuery,

        setSearch,
        setSort,
        setPage,
        setLimit,

        setFilter,
        clearFilter,

        visibleColumns,
        setColumnVisibility,
        activeColumns,
    };
}