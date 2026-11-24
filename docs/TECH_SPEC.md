# TECH_SPEC — GitHub Blog

Relaciona decisões aos IDs do PRD (RF/RN).

## 1. Stack (RF-08, RF-12, RF-15, RNF)

- React 18 + Vite
- TypeScript estrito (`strict: true`)
- Tailwind CSS
- Axios
- React Router v6
- react-markdown (sem `rehype-raw`)
- Vitest + Testing Library (testes)

## 2. Arquitetura

SPA client-side. Rotas:
- `/` → Home (perfil + lista + busca + paginação)
- `/post/:number` → Detalhe do post
- `*` → página 404

Camadas:
- `src/config/` — configuração centralizada (owner, username, repo, pageSize, apiBase, timeout).
- `src/services/` — funções Axios (githubService).
- `src/hooks/` — hooks próprios (`useDebounce`, `useIssuesSearch`, `useProfile`).
- `src/types/` — interfaces (`GitHubUser`, `GitHubIssue`, `PaginatedResponse`, `ApiErrorState`).
- `src/utils/` — helpers (formatação de data relativa, resumo de Markdown, normalização).
- `src/components/` — componentes reutilizáveis.
- `src/pages/` — páginas (Home, PostDetail, NotFound).

## 3. Fluxo de dados

1. `Home` monta → chama `fetchProfile(username)` e `fetchIssues({ query, page })`.
2. Busca: input → `useDebounce` (500 ms) → nova requisição; Enter força imediata.
3. Detalhe: `PostDetail` lê `:number` da rota → `fetchIssue(number)` → renderiza Markdown.
4. Estado de navegação (termo/página) preservado via `location.state` ou query params.

## 4. Diretórios

```
src/
  config/
    app.config.ts
  types/
    github.ts
  services/
    github.service.ts
  hooks/
    useDebounce.ts
    useProfile.ts
    useIssues.ts
  utils/
    date.ts
    markdown.ts
    search.ts
  components/
    ProfileCard.tsx
    SearchInput.tsx
    IssueCard.tsx
    IssueList.tsx
    Pagination.tsx
    LoadingState.tsx
    ErrorState.tsx
  pages/
    Home.tsx
    PostDetail.tsx
    NotFound.tsx
  App.tsx
  main.tsx
```

## 5. Interfaces

```ts
export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  followers: number;
  company: string | null;
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
  user: { login: string; avatar_url: string } | null;
  pull_request?: { url: string };
}

export interface SearchIssuesResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubIssue[];
}
```

## 6. Funções Axios (RF-03, RF-05, RF-10, RF-13, RF-14)

- `fetchProfile(username)` → `GET /users/{username}`.
- `searchIssues({ query, page, perPage })` → `GET /search/issues` com `q=repo:owner/repo is:issue <query>`, `sort=created`, `order=desc`, `page`, `per_page`.
- `fetchIssue(owner, repo, number)` → `GET /repos/{owner}/{repo}/issues/{number}`.

Headers: `Accept: application/vnd.github+json`, `X-GitHub-Api-Version: 2022-11-28`. Timeout configurável (10 s). Cancelamento via `AbortController`.

## 7. Erros (RF-13, RF-14)

Mapear status:
- 404 → "Não encontrado"
- 403/429 → rate limit; ler `Retry-After` ou `X-RateLimit-Reset`
- network error (sem resposta) → "Falha de rede"
- outros → "Erro inesperado"
- timeout → "Tempo esgotado"

Respostas obsoletas: usar flag `isActive` / AbortController para descartar.

## 8. Hooks

- `useDebounce(value, delay)` — retorna valor debounced.
- `useProfile(username)` — carrega perfil, expõe `{ data, loading, error, retry }`.
- `useIssues({ query, page })` — carrega issues, expõe `{ data, loading, error, retry, hasNext, hasPrev }`.

## 9. Rotas e busca (RF-05, RF-06, RF-07, RF-12)

- Busca normalizada: `query.trim().replace(/\s+/g, ' ')`.
- Codificação: passar termo como parâmetro Axios (`params`), não concatenar na URL manualmente.
- Debounce 500 ms; Enter força busca imediata.
- Ao mudar termo, `page = 1`.
- Paginação: `page` e `per_page=6`; desabilitar Anterior/Próxima quando não houver outra página (`items.length < perPage` e `page`).

## 10. Markdown (RF-12, RN-07)

- `react-markdown` sem `rehype-raw` (sem HTML cru).
- Links com `target="_blank"` e `rel="noopener noreferrer"`.
- Resumo no card: extrair texto do Markdown (remover marcadores) e truncar.

## 11. Acessibilidade (RF-16)

- Labels reais em inputs.
- Foco visível (Tailwind `focus:ring`).
- `aria-live` para mensagens de estado.
- Página 404 com link de retorno.

## 12. Estratégia de testes (RF-07, RF-10, RF-13, RF-14)

- Cenário A: debounce e paginação na Search API (mock Axios).
- Cenário B: acesso direto ao detalhe com Markdown.
- Cenário C: falhas com ações de recuperação (404, rate limit).
- Verificações de tipos (`tsc --noEmit`) e build (`vite build`).

## 13. Configuração centralizada (RN-10)

`src/config/app.config.ts`:
```ts
export const APP_CONFIG = {
  github: {
    apiBase: 'https://api.github.com',
    owner: 'Jonhsantos',
    username: 'Jonhsantos',
    repo: 'gitHub-blog',
    pageSize: 6,
    requestTimeoutMs: 10000,
  },
} as const;
```
