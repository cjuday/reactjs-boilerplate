import { api } from '@/services/api';
import type { ChangePasswordRequest } from '../types/requests/change-password-request';
import type { ChangePasswordResponse } from '../types/responses/change-password-response';

export const securityApi = api.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
            query: (body) => ({
                url: '/auth/change-password',
                method: 'PATCH',
                body
            }),
        }),
    }),
});

export const {
    useChangePasswordMutation,
} = securityApi;