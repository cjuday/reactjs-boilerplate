import { createApi } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/app/store';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const api = createApi({
    reducerPath: 'api',

    baseQuery: baseQueryWithReauth({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include',

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Users'],
    endpoints: () => ({}),
});