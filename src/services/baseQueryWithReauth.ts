import { fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { setCredentials, clearCredentials } from '@/features/auth/store/auth.slice';
import { Mutex } from 'async-mutex';
import type { AuthResponse } from '@/features/auth';

export function baseQueryWithReauth( options: Parameters<typeof fetchBaseQuery>[0] ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> {
    const mutex = new Mutex();
    const rawBaseQuery = fetchBaseQuery(options);

    return async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
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
                    const { accessToken } = refreshResult.data as AuthResponse;

                    api.dispatch(setCredentials(accessToken));

                    result = await rawBaseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(clearCredentials());
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