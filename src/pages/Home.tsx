import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { useProfile } from '../hooks/useProfile';
import { useIssues } from '../hooks/useIssues';
import { normalizeSearch } from '../utils/markdown';
import { APP_CONFIG } from '../config/app.config';
import { ProfileCard } from '../components/ProfileCard';
import { SearchInput } from '../components/SearchInput';
import { IssueList } from '../components/IssueList';
import { Pagination } from '../components/Pagination';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get('q') ?? '';
  const pageParam = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);

  const [inputValue, setInputValue] = useState(qParam);
  const debounced = useDebounce(inputValue, 500);

  const { data: profile, loading: profileLoading, error: profileError, retry: retryProfile } =
    useProfile(APP_CONFIG.github.username);
  const { issues, loading: issuesLoading, error: issuesError, retry: retryIssues, hasNext, hasPrev } =
    useIssues({ query: qParam, page: pageParam });

  // Apply debounced search
  useEffect(() => {
    const normalized = normalizeSearch(debounced);
    if (normalized !== qParam) {
      setSearchParams({ q: normalized, page: '1' }, { replace: true });
    }
  }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  const applySearch = () => {
    const normalized = normalizeSearch(inputValue);
    setSearchParams({ q: normalized, page: '1' }, { replace: true });
  };

  const goPrev = () => {
    if (pageParam > 1) setSearchParams({ q: qParam, page: String(pageParam - 1) }, { replace: true });
  };
  const goNext = () => {
    setSearchParams({ q: qParam, page: String(pageParam + 1) }, { replace: true });
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:px-8">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">GITHUB BLOG</h2>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <div>
          {profileLoading && <LoadingState message="Carregando perfil..." />}
          {profileError && <ErrorState error={profileError} onRetry={retryProfile} />}
          {profile && <ProfileCard user={profile} />}
        </div>

        <section aria-labelledby="posts-heading">
          <h2 id="posts-heading" className="mb-4 text-xl font-semibold text-gray-900">
            Publicações
          </h2>
          <div className="mb-4">
            <SearchInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={applySearch}
              placeholder="Buscar publicações..."
            />
          </div>

          {issuesLoading && <LoadingState message="Carregando publicações..." />}
          {issuesError && <ErrorState error={issuesError} onRetry={retryIssues} />}
          {!issuesLoading && !issuesError && issues.length === 0 && (
            <div role="status" aria-live="polite" className="py-12 text-center text-gray-500">
              Nenhuma publicação encontrada.
            </div>
          )}
          {!issuesLoading && !issuesError && issues.length > 0 && (
            <>
              <IssueList issues={issues} />
              <Pagination
                page={pageParam}
                hasNext={hasNext}
                hasPrev={hasPrev}
                onPrev={goPrev}
                onNext={goNext}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
