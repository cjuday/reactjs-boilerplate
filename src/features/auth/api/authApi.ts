import { api } from "@/services/api";
import type { LoginRequest } from "../types/requests/login-request";
import type { AuthResponse } from "../types/responses/auth-response";
import type { RegisterResponse } from "../types/responses/register-response";
import type { RegisterRequest } from "../types";
import type { ResendVerificationResponse } from '../types/responses/resend-verification-response';

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
                method: 'POST'
            })
        }),

        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body
            })
        }),

        resendVerificationEmail: builder.mutation<ResendVerificationResponse, void>({
            query: () => ({
                url: '/auth/resend-email-verification',
                method: 'POST',
            })
        }),

        verifyEmail: builder.mutation<{ message: string }, { token: string }>({
            query: (body) => ({
                url: '/auth/verify-email',
                method: 'POST',
                body
            })
        }),

        forgotPassword: builder.mutation<{ message: string}, { email: string}>({
            query: (body) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body
            })
        }),

        resetPassword: builder.mutation<{message: string}, {token: string, password:string}>({
            query: (body) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body
            })
        })
    })
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation, useRegisterMutation, useResendVerificationEmailMutation, useVerifyEmailMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;