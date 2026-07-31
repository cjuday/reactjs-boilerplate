import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function getErrorMessage(error: unknown): string {
  if (!error) {
    return 'Something went wrong.';
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const fetchError = error as FetchBaseQueryError;

    if ('data' in fetchError) {
      const data = fetchError.data as
        | { message?: string | string[] }
        | undefined;

      if (Array.isArray(data?.message)) {
        return data.message.join(', ');
      }

      if (typeof data?.message === 'string') {
        return data.message;
      }
    }

    if (fetchError.status === 'FETCH_ERROR') {
      return 'Unable to connect to the server.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
}