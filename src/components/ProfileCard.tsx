import type { GitHubUser } from '../types/github';

interface Props {
  user: GitHubUser;
}

export function ProfileCard({ user }: Props) {
  const name = user.name ?? user.login;
  return (
    <aside className="relative overflow-hidden rounded-[10px] bg-profile p-6 shadow-[0_2px_28px_0_rgba(0,0,0,0.2)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <img
          src={user.avatar_url}
          alt={`Avatar de ${name}`}
          className="h-[148px] w-[148px] rounded-[8px] object-cover"
        />
        <div className="flex-1">
          <h1 className="font-bold text-[24px] leading-[1.3] text-title">{name}</h1>
          {user.bio && (
            <p className="mt-2 w-full max-w-[612px] text-[16px] leading-[1.6] text-text">
              {user.bio}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-6 text-[16px] text-subtitle">
            <span className="flex items-center gap-2">
              <span className="text-muted">●</span> @{user.login}
            </span>
            {user.company && (
              <span className="flex items-center gap-2">
                <span className="text-muted">●</span> {user.company}
              </span>
            )}
            <span className="flex items-center gap-2">
              <span className="text-muted">●</span> {user.followers} seguidores
            </span>
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold uppercase text-accent"
          >
            github
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
