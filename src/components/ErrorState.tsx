import type { ApiError } from '../types/github';

interface Props {
  error: ApiError;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: Props) {
  const retryable = error.kind !== 'not_found' && error.kind !== 'invalid_number' && error.kind !== 'pull_request';
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center"
    >
      <p className="text-sm font-medium text-red-700">{error.message}</p>
      {error.retryAfter && (
        <p className="mt-1 text-xs text-red-600">
          Tente novamente em {error.retryAfter}s.
        </p>
      )}
      {retryable && onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
