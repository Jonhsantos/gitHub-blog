import { IssueCard } from './IssueCard';
import type { GitHubIssue } from '../types/github';

interface Props {
  issues: GitHubIssue[];
}

export function IssueList({ issues }: Props) {
  if (issues.length === 0) return null;
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {issues.map((issue) => (
        <li key={issue.number}>
          <IssueCard issue={issue} />
        </li>
      ))}
    </ul>
  );
}
