import { api } from '@/services/api';
import type { DataTableFilter } from '@/components/ui/DataTable/types';

export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: { id: string; name: string; } | null;
    isEmailVerified: boolean;
    emailVerifiedAt: string | null;
    isActive: boolean;
    createdAt: string;
}

export interface UsersQuery {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    filters?: Record<string, unknown>;
    columns?: string[];
}

export interface UsersResponse {
    data: User[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

interface TableColumnConfig {
    key: string;
    label: string;
    visible: boolean;
    sortable: boolean;
    searchable: boolean;
    exportable: boolean;
    filter?: DataTableFilter;
}

export interface UsersTableConfig {
    resource: string;
    columns: TableColumnConfig[];
}

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<UsersResponse, UsersQuery>({
            query: (params) => ({
                url: '/users',
                method: 'GET',
                params: {
                    page: params.page,
                    limit: params.limit,
                    search: params.search,
                    sortBy: params.sortBy,
                    sortOrder: params.sortOrder,
                    filters: JSON.stringify(params.filters),
                },
            }),
            providesTags: ['Users'],
        }),
        getUser: builder.query<User, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'GET',
            }),
        }),

        updateUser: builder.mutation<
            { message: string; user: User },
            {
                id: string;
                data: {
                    name: string;
                    phoneNumber: string;
                };
            }
        >({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),

        deleteUser: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),

        getUsersTableConfig: builder.query<UsersTableConfig, void>({
            query: () => ({
                url: '/users/table-config',
                method: 'GET',
            }),
        }),

        exportUsers: builder.mutation<string, UsersQuery>({
            query: (params) => ({
                url: '/users/export',
                method: 'GET',
                params: {
                    search: params.search,
                    sortBy: params.sortBy,
                    sortOrder: params.sortOrder,
                    filters: JSON.stringify(
                        params.filters ?? {},
                    ),
                    columns: JSON.stringify(
                        params.columns ?? [],
                    ),
                },
                responseHandler: async (response) => {
                    if (!response.ok) {
                        const error = await response.json();

                        throw new Error(
                            Array.isArray(error.message)
                                ? error.message.join(', ')
                                : error.message ??
                                'Export failed.',
                        );
                    }

                    return response.blob();
                },
            }),
            transformResponse: (blob: Blob) => { return URL.createObjectURL(blob); },
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUsersTableConfigQuery,
    useExportUsersMutation,
    useDeleteUserMutation,
    useGetUserQuery,
    useUpdateUserMutation,
} = usersApi;