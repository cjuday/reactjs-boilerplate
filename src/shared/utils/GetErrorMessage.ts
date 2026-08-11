import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ApiErrorResponse {
    message?: string | string[];
}

export function getErrorMessage(error: unknown): string {
    if (!error) {
        return 'Something went wrong.';
    }

    if (typeof error === 'object' && error !== null && 'status' in error) {
        const fetchError = error as FetchBaseQueryError;

        if ('data' in fetchError) {
            const data = fetchError.data as ApiErrorResponse | undefined;

            if (Array.isArray(data?.message)) {
                return data.message.join(', ');
            }

            if (typeof data?.message === 'string') {
                return data.message;
            }
        }

        switch (fetchError.status) {
            case 'FETCH_ERROR':
                return 'Unable to connect to the server.';

            case 'PARSING_ERROR':
                return 'Unable to process the server response.';

            case 'TIMEOUT_ERROR':
                return 'The request timed out. Please try again.';

            case 'CUSTOM_ERROR':
                return 'Something went wrong.';
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'Something went wrong.';
}