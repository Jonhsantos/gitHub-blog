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
  const summary = truncate(stripMarkdown(issue.body), 180);
  return (
    <article className="relative h-[260px] cursor-pointer overflow-hidden rounded-[10px] bg-post p-8 text-left">
      <Link
        to={`/post/${issue.number}`}
        state={{ from }}
        className="block text-[20px] font-bold leading-[1.6] text-title hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
      >
        {issue.title}
      </Link>
      <p className="absolute right-[32px] top-[37px] whitespace-nowrap text-[14px] text-muted">
        {formatRelativeDate(issue.created_at)}
      </p>
      <div className="mt-4 overflow-hidden text-ellipsis text-[16px] leading-[1.6] text-text">
        {summary || 'Sem descrição disponível.'}
      </div>
      <div className="absolute bottom-8 left-8 text-[14px] text-muted">
        {issue.comments} comentários
      </div>
    </article>
  );
}
