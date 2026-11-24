import { Link, useLocation } from 'react-router-dom';
import { formatRelativeDate } from '../utils/date';
import { stripMarkdown, truncate } from '../utils/markdown';
import type { GitHubIssue } from '../types/github';

interface Props {
  issue: GitHubIssue;
}

export function IssueCard({ issue }: Props) {
  const location = useLocation();
  const from = location.pathname + location.search;
  const summary = truncate(stripMarkdown(issue.body), 160);
  return (
    <article className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
      <Link
        to={`/post/${issue.number}`}
        state={{ from }}
        className="text-lg font-semibold text-gray-900 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {issue.title}
      </Link>
      <p className="mt-1 text-xs text-gray-500">
        {formatRelativeDate(issue.created_at)} · {issue.comments} comentários
      </p>
      <p className="mt-3 flex-1 text-sm text-gray-700">
        {summary || 'Sem descrição disponível.'}
      </p>
      <div className="mt-4">
        <Link
          to={`/post/${issue.number}`}
          state={{ from }}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Ler mais →
        </Link>
      </div>
    </article>
  );
}
