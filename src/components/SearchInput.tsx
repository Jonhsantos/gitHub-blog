interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, onSubmit, placeholder }: Props) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex gap-2"
    >
      <label htmlFor="busca" className="sr-only">
        Buscar publicações
      </label>
      <input
        id="busca"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
          }
        }}
        placeholder={placeholder ?? 'Buscar conteúdo'}
        className="flex-1 rounded-[6px] border border-border bg-input px-[16px] py-[12px] text-[16px] text-text placeholder:text-label focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <button
        type="submit"
        className="rounded-[6px] bg-accent px-4 py-2 text-sm font-bold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Buscar
      </button>
    </form>
  );
}
