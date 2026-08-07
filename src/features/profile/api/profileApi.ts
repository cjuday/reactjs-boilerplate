import { api } from '@/services/api';
import type { User } from '@/features/auth/types/responses/auth-response';
import type { UpdateProfileRequest } from '../types/requests/update-profile-request';
import type { ProfileResponse } from '../types/responses/profile-response';

export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<User, void>({
            query: () => ({
                url: '/users/me'
            }),
        }),

        updateProfile: builder.mutation<ProfileResponse, UpdateProfileRequest>({
            query: (body) => ({
                url: '/users/me',
                method: 'PATCH',
                body
            }),
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;