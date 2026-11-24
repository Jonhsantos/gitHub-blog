import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchIssue } from '../services/github.service';
import { formatDate } from '../utils/date';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import type { GitHubIssue, ApiError } from '../types/github';

export function PostDetail() {
  const { number } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const num = Number(number);

  const [issue, setIssue] = useState<GitHubIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!Number.isInteger(num) || num <= 0) {
      setError({ kind: 'invalid_number', message: 'Número de publicação inválido.' });
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    let active = true;
    setLoading(true);
    setError(null);
    fetchIssue(num, controller.signal)
      .then((d) => {
        if (active) setIssue(d);
      })
      .catch((e: ApiError) => {
        if (active) setError(e);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [num, tick]);

  const handleBack = () => {
    const from = (location.state as { from?: string } | null)?.from;
    if (from) navigate(from);
    else navigate('/');
  };

  if (loading) return <LoadingState message="Carregando publicação..." />;
  if (error) return <ErrorState error={error} onRetry={() => setTick((t) => t + 1)} />;
  if (!issue) return null;

  const author = issue.user?.login ?? 'desconhecido';

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 md:px-8">
      <button
        type="button"
        onClick={handleBack}
        className="mb-4 text-sm font-medium text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        ← Voltar
      </button>

      <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{issue.title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          Por {author} · {formatDate(issue.created_at)} · {issue.comments} comentários
        </p>

        <div className="prose mt-6 max-w-none overflow-x-auto">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
              code: ({ node, className, children, ...props }) => (
                <code className={`${className ?? ''} block overflow-x-auto`} {...props}>
                  {children}
                </code>
              ),
            }}
          >
            {issue.body ?? '_Sem conteúdo._'}
          </ReactMarkdown>
        </div>

        <div className="mt-6">
          <a
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Ver no GitHub
          </a>
        </div>
      </article>
    </main>
  );
}
