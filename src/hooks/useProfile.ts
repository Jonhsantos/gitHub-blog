import { useEffect, useState, useCallback } from 'react';
import { fetchProfile } from '../services/github.service';
import { APP_CONFIG } from '../config/app.config';
import type { GitHubUser, ApiError } from '../types/github';

export interface UseProfileResult {
  data: GitHubUser | null;
  loading: boolean;
  error: ApiError | null;
  retry: () => void;
}

export function useProfile(username: string = APP_CONFIG.github.username): UseProfileResult {
  const [data, setData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [tick, setTick] = useState(0);

  const retry = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setLoading(true);
    setError(null);
    fetchProfile(username, controller.signal)
      .then((d) => {
        if (active) setData(d);
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
  }, [username, tick]);

  return { data, loading, error, retry };
}
