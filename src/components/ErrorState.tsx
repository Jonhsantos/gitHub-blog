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
      className="rounded-[10px] border border-red-500/30 bg-red-900/20 p-6 text-center"
    >
      <p className="text-sm font-medium text-red-300">{error.message}</p>
      {error.retryAfter && (
        <p className="mt-1 text-xs text-red-400">Tente novamente em {error.retryAfter}s.</p>
      )}
      {retryable && onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-[6px] bg-accent px-4 py-2 text-sm font-bold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
