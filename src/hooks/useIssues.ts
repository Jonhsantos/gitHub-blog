import { useEffect, useState, useCallback } from 'react';
import { searchIssues } from '../services/github.service';
import { APP_CONFIG } from '../config/app.config';
import type { GitHubIssue, SearchIssuesResponse, ApiError } from '../types/github';

export interface UseIssuesParams {
  query: string;
  page: number;
  perPage?: number;
}

export interface UseIssuesResult {
  data: SearchIssuesResponse | null;
  issues: GitHubIssue[];
  loading: boolean;
  error: ApiError | null;
  retry: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function useIssues({ query, page, perPage = APP_CONFIG.github.pageSize }: UseIssuesParams): UseIssuesResult {
  const [data, setData] = useState<SearchIssuesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [tick, setTick] = useState(0);

  const retry = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setLoading(true);
    setError(null);
    searchIssues({ query, page, perPage, signal: controller.signal })
      .then((d) => {
        if (active) setData(d);
      })
      .catch((e: ApiError) => {
        if (active && (e as ApiError).kind !== undefined) setError(e);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [query, page, perPage, tick]);

  const issues = data?.items ?? [];
  const hasNext = issues.length >= perPage;
  const hasPrev = page > 1;

  return { data, issues, loading, error, retry, hasNext, hasPrev };
}
