import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { useProfile } from '../hooks/useProfile';
import { useIssues } from '../hooks/useIssues';
import { normalizeSearch } from '../utils/markdown';
import { APP_CONFIG } from '../config/app.config';
import { ProfileCard } from '../components/ProfileCard';
import { SearchInput } from '../components/SearchInput';
import { IssueCard } from '../components/IssueCard';
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
    <div className="min-h-screen bg-bg">
      {/* Cover */}
      <div className="relative h-[296px] overflow-hidden bg-profile">
        <div className="absolute -left-[130px] -top-[96px] h-[236px] w-[236px] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-[10px] -top-[52px] h-[190px] w-[190px] rotate-[15deg] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute left-1/2 top-[64px] flex -translate-x-1/2 flex-col items-center gap-5">
          <div className="flex h-[40px] w-[45px] items-center justify-center text-accent">
            <svg viewBox="0 0 45 40" className="h-full w-full" fill="currentColor" aria-hidden>
              <path d="M0 0h45v40H0z" opacity="0" />
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="28" fontFamily="monospace">&gt;_</text>
            </svg>
          </div>
          <h1 className="whitespace-nowrap font-logo text-[24px] text-accent">GITHUB BLOG</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] px-4 py-8 md:px-0">
        {/* Profile */}
        {profileLoading && <LoadingState message="Carregando perfil..." />}
        {profileError && <ErrorState error={profileError} onRetry={retryProfile} />}
        {profile && <ProfileCard user={profile} />}

        {/* Search */}
        <div className="mt-8 w-full max-w-[864px]">
          <SearchInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={applySearch}
            placeholder="Buscar conteúdo"
          />
        </div>

        {/* Posts header */}
        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-subtitle">Publicações</h2>
          <span className="text-[14px] text-muted">{issues.length} publicações</span>
        </div>

        {/* States */}
        {issuesLoading && <LoadingState message="Carregando publicações..." />}
        {issuesError && <ErrorState error={issuesError} onRetry={retryIssues} />}
        {!issuesLoading && !issuesError && issues.length === 0 && (
          <div role="status" aria-live="polite" className="py-12 text-center text-muted">
            Nenhuma publicação encontrada.
          </div>
        )}
        {!issuesLoading && !issuesError && issues.length > 0 && (
          <>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
              {issues.map((issue) => (
                <IssueCard key={issue.number} issue={issue} />
              ))}
            </div>
            <Pagination
              page={pageParam}
              hasNext={hasNext}
              hasPrev={hasPrev}
              onPrev={goPrev}
              onNext={goNext}
            />
          </>
        )}
      </div>
    </div>
  );
}
