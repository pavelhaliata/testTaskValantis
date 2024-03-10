import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

/**
 * Предикат типа, позволяющий свести неизвестную ошибку к `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Предикат типа для сужения неизвестной ошибки до объекта со строковым свойством 'message'
 */
export function isErrorWithMessage(
  error: unknown,
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}
