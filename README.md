# GitHub Blog

SPA em React/Vite/TypeScript que exibe um blog a partir das issues de um repositório GitHub público.

## Configuração

Edite `src/config/app.config.ts`:

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

## Comandos

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # build de produção
npm run preview   # preview do build
npm run test      # testes
npm run typecheck # checagem de tipos
```

## Arquitetura

Ver `docs/TECH_SPEC.md`. Camadas: `config/`, `types/`, `services/`, `hooks/`, `utils/`, `components/`, `pages/`.

## Listagem e busca

- Com busca vazia: `GET /search/issues?q=repo:owner/repo is:issue&sort=created&order=desc`.
- Com busca: qualificador + termo normalizado, passado via `params` do Axios.
- Paginação remota com `page` e `per_page=6`.
- Debounce de 500 ms; Enter força busca imediata.

## Testes

- `npm run test` (Vitest + Testing Library).
- Cenários: debounce/paginação, acesso direto ao detalhe com Markdown, falhas (404, rate limit) com recuperação.

## Publicação

Build estático em `dist/`. Deploy via GitHub Pages (workflow em `.github/workflows/deploy.yml`).

## Capturas

![Home desktop](docs/images/home-desktop.png)
![Detalhe desktop](docs/images/post-desktop.png)
![Home mobile](docs/images/home-mobile.png)
![Detalhe mobile](docs/images/post-mobile.png)

## Roteiro de demonstração

1. Abrir a Home e ver perfil + lista.
2. Buscar por "React" e observar debounce.
3. Navegar entre páginas.
4. Abrir um post e ler Markdown.
5. Voltar preservando busca/página.
6. Testar acesso direto a `/post/1` com recarga.
EOF