import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-title">404</h1>
      <p className="mt-2 text-muted">Página não encontrada.</p>
      <Link
        to="/"
        className="mt-6 rounded-[6px] bg-accent px-4 py-2 text-sm font-bold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Voltar à Home
      </Link>
    </main>
  );
}
