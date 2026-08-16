import { api } from '@/services/api';

export interface Role {
    id: string;
    name: string;
    description: string | null;
}

export const rolesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query<Role[], void>({
            query: () => ({
                url: '/roles',
                method: 'GET',
            }),
        }),

        getRoleOptions: builder.query<Role[], void>({
            query: () => ({
                url: '/roles/options',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetRolesQuery,
    useGetRoleOptionsQuery,
} = rolesApi;