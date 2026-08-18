import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
    key: keyof T & string;
    label: string;
    visible?: boolean;
    sortable?: boolean;
    searchable?: boolean;
    exportable?: boolean;
    filter?: DataTableFilter;
    render?: (value: T[keyof T], row: T) => ReactNode;
}

export type DataTableSortOrder = 'asc' | 'desc';

export type DataTableFilterType =
    | 'text'
    | 'select'
    | 'date'
    | 'date-range';

export interface DataTableFilterOption {
    label: string;
    value: string;
}

export interface DataTableFilter {
    type: DataTableFilterType;
    options?: DataTableFilterOption[];
}

export interface DataTableQuery {
    page: number;
    limit: number;
    search: string;
    sortBy?: string;
    sortOrder?: DataTableSortOrder;
    filters: Record<string, unknown>;
    columns?: string[];
}

export interface DataTableRowAction<T> {
  label: string;
  icon: React.ReactNode;
  onClick: (row: T) => void;
  visible?: (row: T) => boolean;
  disabled?: (row: T) => boolean;
  className?: string;
}