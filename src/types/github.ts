export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  followers: number;
  company: string | null;
}

export interface GitHubIssueUser {
  login: string;
  avatar_url: string;
}

export interface GitHubIssue {
  number: number;
  title: string;
  body: string | null;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  comments: number;
  html_url: string;
  user: GitHubIssueUser | null;
  pull_request?: { url: string };
}

export interface SearchIssuesResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubIssue[];
}

export type ApiErrorKind =
  | 'not_found'
  | 'rate_limit'
  | 'network'
  | 'timeout'
  | 'http'
  | 'invalid_number'
  | 'pull_request';

export interface ApiError {
  kind: ApiErrorKind;
  message: string;
  status?: number;
  retryAfter?: number; // seconds
}
