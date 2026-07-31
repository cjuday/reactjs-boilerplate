import { api } from "@/services/api";
import type { LoginRequest } from "../types/requests/login-request";
import type { AuthResponse } from "../types/responses/auth-response";

export const authApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: body => ({
                url: '/auth/login',
                method: 'POST',
                body
            })
        }),

        refresh: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST'
            })
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    })
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } = authApi;