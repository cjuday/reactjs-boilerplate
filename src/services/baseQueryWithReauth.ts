import { fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { setCredentials, clearCredentials } from '@/features/auth/store/auth.slice';
import { Mutex } from 'async-mutex';
import type { AuthResponse } from '@/features/auth';

const mutex = new Mutex();

export function baseQueryWithReauth( options: Parameters<typeof fetchBaseQuery>[0] ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> {
    const rawBaseQuery = fetchBaseQuery(options);

    return async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await rawBaseQuery(args, api, extraOptions);

    const url = typeof args === 'string' ? args : args.url;

    const isAuthEndpoint = url === '/auth/refresh' || url === '/auth/logout' || url === '/auth/login';

    if (result.error?.status === 401 && !isAuthEndpoint) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await rawBaseQuery(
                    {
                        url: '/auth/refresh',
                        method: 'POST',
                    },
                    api,
                    extraOptions,
                );

                if (refreshResult.data) {
                    const response = refreshResult.data as AuthResponse;

                    api.dispatch(setCredentials(response));

                    result = await rawBaseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(clearCredentials());

                    return result;
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();

            result = await rawBaseQuery(args, api, extraOptions);
        }
    }
    return result;
    };
}