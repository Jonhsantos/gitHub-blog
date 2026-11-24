interface Props {
  message?: string;
}

export function LoadingState({ message = 'Carregando...' }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-3 py-12"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}
