import type { GitHubUser } from '../types/github';

interface Props {
  user: GitHubUser;
}

export function ProfileCard({ user }: Props) {
  const name = user.name ?? user.login;
  return (
    <aside className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <img
          src={user.avatar_url}
          alt={`Avatar de ${name}`}
          className="h-24 w-24 rounded-full ring-2 ring-gray-100"
        />
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-xl font-bold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-500">@{user.login}</p>
          {user.bio && <p className="mt-2 text-sm text-gray-700">{user.bio}</p>}
          {user.company && (
            <p className="mt-1 text-sm text-gray-500">{user.company}</p>
          )}
          <p className="mt-2 text-sm text-gray-600">
            {user.followers} seguidores
          </p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ver perfil no GitHub
          </a>
        </div>
      </div>
    </aside>
  );
}
