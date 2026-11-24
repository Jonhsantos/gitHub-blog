interface Props {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({ page, hasNext, hasPrev, onPrev, onNext }: Props) {
  return (
    <nav
      aria-label="Paginação"
      className="mt-8 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        onClick={onPrev}
        disabled={!hasPrev}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Anterior
      </button>
      <span className="text-sm text-gray-600" aria-live="polite">
        Página {page}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={!hasNext}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Próxima
      </button>
    </nav>
  );
}
