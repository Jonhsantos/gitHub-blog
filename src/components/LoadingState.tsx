interface Props {
  message?: string;
}

export function LoadingState({ message = 'Carregando...' }: Props) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent" />
      <p className="text-sm text-muted">{message}</p>
    </div>
  );
}
