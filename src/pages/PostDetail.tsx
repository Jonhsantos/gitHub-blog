import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchIssue } from '../services/github.service';
import { formatRelativeDate } from '../utils/date';
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
      {/* Cover */}
      <div className="relative h-[296px] overflow-hidden bg-profile">
        <div className="absolute -left-[130px] -top-[96px] h-[236px] w-[236px] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-[10px] -top-[52px] h-[190px] w-[190px] rotate-[15deg] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute left-1/2 top-[64px] flex -translate-x-1/2 flex-col items-center gap-5">
          <div className="flex h-[40px] w-[45px] items-center justify-center text-accent">
            <svg viewBox="0 0 45 40" className="h-full w-full" fill="currentColor" aria-hidden>
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="28" fontFamily="monospace">&gt;_</text>
            </svg>
          </div>
          <h1 className="whitespace-nowrap font-logo text-[24px] text-accent">GITHUB BLOG</h1>
        </div>
      </div>

      <main className="mx-auto max-w-[864px] px-4 py-8">
        {/* Post info */}
        <div className="relative mb-6 h-[168px] overflow-hidden rounded-[10px] bg-profile shadow-[0_2px_28px_0_rgba(0,0,0,0.2)]">
          <h1 className="absolute left-[32px] right-[32px] top-[71px] text-[24px] font-bold leading-[1.3] text-title">
            {issue.title}
          </h1>
          <div className="absolute left-[32px] top-[110px] flex items-center gap-8">
            <span className="flex items-center gap-2 text-[16px] text-muted">
              <span aria-hidden>●</span> {author}
            </span>
            <span className="flex items-center gap-2 text-[16px] text-muted">
              <span aria-hidden>●</span> {formatRelativeDate(issue.created_at)}
            </span>
            <span className="flex items-center gap-2 text-[16px] text-muted">
              <span aria-hidden>●</span> {issue.comments} comentários
            </span>
          </div>
          <button
            type="button"
            onClick={handleBack}
            className="absolute left-[32px] top-[32px] flex items-center gap-2 text-[12px] font-bold uppercase text-accent"
          >
            <span aria-hidden>←</span> voltar
          </button>
          <a
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-[32px] top-[32px] flex items-center gap-2 text-[12px] font-bold uppercase text-accent"
          >
            ver no github <span aria-hidden>↗</span>
          </a>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 rounded-[10px] bg-bg px-8 py-10">
          <div className="whitespace-pre-wrap text-[16px] leading-[1.6] text-text">
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} className="text-accent underline" target="_blank" rel="noopener noreferrer" />
                ),
                code: ({ node, className, children, ...props }) => (
                  <code className={`${className ?? ''} block overflow-x-auto rounded-[2px] bg-post p-4 text-text`} {...props}>
                    {children}
                  </code>
                ),
                p: ({ node, ...props }) => <p className="mb-4 leading-[1.6]" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
              }}
            >
              {issue.body ?? '_Sem conteúdo._'}
            </ReactMarkdown>
          </div>
        </div>
      </main>
    </div>
  );
}
