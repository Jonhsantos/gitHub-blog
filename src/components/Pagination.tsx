interface Props {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({ page, hasNext, hasPrev, onPrev, onNext }: Props) {
  return (
    <nav aria-label="Paginação" className="mt-8 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrev}
        disabled={!hasPrev}
        className="rounded-[6px] border border-border bg-input px-4 py-2 text-sm text-text disabled:cursor-not-allowed disabled:opacity-40 hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Anterior
      </button>
      <span className="text-sm text-muted" aria-live="polite">
        Página {page}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        className="rounded-[6px] border border-border bg-input px-4 py-2 text-sm text-text disabled:cursor-not-allowed disabled:opacity-40 hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Próxima
      </button>
    </nav>
  );
}
