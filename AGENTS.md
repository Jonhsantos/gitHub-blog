# AGENTS.md

## Contexto

Projeto de faculdade: GitHub Blog SPA em React/Vite/TypeScript. Perfil via API pública do GitHub; publicações são issues de `Jonhsantos/gitHub-blog`.

## Stack

React, Vite, TypeScript estrito, Tailwind CSS, Axios, React Router, react-markdown.

## Referências

- Docs: `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASKS_SPEC.md`.
- Figma: https://www.figma.com/design/OmDrt5w9X5tpkk6Y5Ai8Bo/...
- GitHub REST docs (users, search issues, issues, rate limits).

## Arquitetura

Ver `docs/TECH_SPEC.md` §2 e §4. Camadas: config, types, services, hooks, utils, components, pages.

## Convenções TypeScript

- `strict: true`; sem `any` implícito; interfaces em `src/types`.
- Lógica HTTP fora de `App.tsx` (em services).
- Configuração centralizada em `src/config/app.config.ts`.

## Testes

- Vitest + Testing Library. Mínimo 3 cenários (debounce/paginação, detalhe direto com Markdown, falhas/recuperação incluindo 404 e rate limit).
- Rodar `npm run test`, `npm run typecheck`, `npm run build` antes de commit.

## Commits

- Semânticos: `feat:`, `fix:`, `docs:`, `test:`, `chore:`.
- Atualizar `docs/TASKS_SPEC.md` status ao concluir tarefa.

## Orientação

Consulte as SPECs antes de alterar código. Não publique credenciais. Preserve trabalho existente.
