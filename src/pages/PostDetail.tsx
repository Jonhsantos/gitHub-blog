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
    <div className="min-h-screen bg-bg">
      <main className="mx-auto max-w-[864px] px-4 py-8">
        <button
          type="button"
          onClick={handleBack}
          className="mb-6 text-sm font-bold text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
        >
          ← Voltar
        </button>

        <article className="rounded-[10px] bg-profile p-8 shadow-[0_2px_28px_0_rgba(0,0,0,0.2)]">
          <h1 className="text-[24px] font-bold leading-[1.3] text-title md:text-[24px]">
            {issue.title}
          </h1>
          <p className="mt-2 text-[14px] text-muted">
            Por {author} · {formatDate(issue.created_at)} · {issue.comments} comentários
          </p>

          <div className="prose prose-invert mt-6 max-w-none overflow-x-auto text-text">
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} className="text-accent underline" target="_blank" rel="noopener noreferrer" />
                ),
                code: ({ node, className, children, ...props }) => (
                  <code className={`${className ?? ''} block overflow-x-auto rounded bg-input p-2 text-text`} {...props}>
                    {children}
                  </code>
                ),
                p: ({ node, ...props }) => <p className="mb-4 leading-[1.6]" {...props} />,
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
              className="inline-block rounded-[6px] bg-accent px-4 py-2 text-sm font-bold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Ver no GitHub
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
