import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { APP_CONFIG } from '../config/app.config';
import type { GitHubIssue, GitHubUser, SearchIssuesResponse, ApiError } from '../types/github';

const { apiBase, requestTimeoutMs } = APP_CONFIG.github;

export const api: AxiosInstance = axios.create({
  baseURL: apiBase,
  timeout: requestTimeoutMs,
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
});

function mapError(err: unknown): ApiError {
  if (axios.isCancel(err)) {
    return { kind: 'network', message: 'Requisição cancelada.' };
  }
  const ax = err as AxiosError;
  if (!ax.response) {
    if (ax.code === 'ECONNABORTED' || ax.message?.includes('timeout')) {
      return { kind: 'timeout', message: 'Tempo de espera esgotado. Tente novamente.' };
    }
    return { kind: 'network', message: 'Falha de rede. Verifique sua conexão.' };
  }
  const status = ax.response.status;
  const headers = ax.response.headers as Record<string, string> | undefined;
  if (status === 404) {
    return { kind: 'not_found', message: 'Não encontrado.', status };
  }
  if (status === 403 || status === 429) {
    let retryAfter: number | undefined;
    const ra = headers?.['retry-after'];
    const reset = headers?.['x-ratelimit-reset'];
    if (ra) retryAfter = Number(ra);
    else if (reset) retryAfter = Math.max(0, Number(reset) - Math.floor(Date.now() / 1000));
    return {
      kind: 'rate_limit',
      message: 'Limite de requisições atingido. Tente novamente mais tarde.',
      status,
      retryAfter,
    };
  }
  return { kind: 'http', message: `Erro HTTP ${status}.`, status };
}

export async function fetchProfile(username: string, signal?: AbortSignal): Promise<GitHubUser> {
  try {
    const { data } = await api.get<GitHubUser>(`/users/${encodeURIComponent(username)}`, { signal });
    return data;
  } catch (err) {
    throw mapError(err);
  }
}

export interface SearchIssuesParams {
  query: string;
  page: number;
  perPage: number;
  signal?: AbortSignal;
}

export async function searchIssues({ query, page, perPage, signal }: SearchIssuesParams): Promise<SearchIssuesResponse> {
  const { owner, repo } = APP_CONFIG.github;
  const normalized = query.trim().replace(/\s+/g, ' ');
  const q = normalized
    ? `repo:${owner}/${repo} is:issue ${normalized}`
    : `repo:${owner}/${repo} is:issue`;
  try {
    const { data } = await api.get<SearchIssuesResponse>('/search/issues', {
      params: { q, sort: 'created', order: 'desc', page, per_page: perPage },
      signal,
    });
    return data;
  } catch (err) {
    throw mapError(err);
  }
}

export async function fetchIssue(number: number, signal?: AbortSignal): Promise<GitHubIssue> {
  if (!Number.isInteger(number) || number <= 0) {
    const e: ApiError = { kind: 'invalid_number', message: 'Número de publicação inválido.' };
    throw e;
  }
  const { owner, repo } = APP_CONFIG.github;
  try {
    const { data } = await api.get<GitHubIssue>(`/repos/${owner}/${repo}/issues/${number}`, { signal });
    if (data.pull_request) {
      const e: ApiError = { kind: 'pull_request', message: 'Este item é um pull request, não uma publicação.' };
      throw e;
    }
    return data;
  } catch (err) {
    if ((err as ApiError).kind) throw err;
    throw mapError(err);
  }
}

export type { AxiosRequestConfig };
