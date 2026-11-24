# TASKS_SPEC — GitHub Blog

Checklist em ordem. Atualize o status ao concluir cada tarefa e faça commit semântico.

| ID | Descrição | Pré-req | RF/RN | Arquivos | Critério de pronto | Status |
|----|-----------|---------|-------|---------|---------------------|--------|
| T-01 | Inspecionar repo, branch, remoto; preservar trabalho | — | — | — | Relatório inicial | Concluído |
| T-02 | Criar/atualizar docs PRD/TECH/TASKS/AGENTS | T-01 | — | docs/*, AGENTS.md | Docs commitados | Concluído |
| T-03 | Verificar repo público e issues existentes | T-01 | RN-02 | — | Contagem registrada (0 issues) | Concluído |
| T-04 | Publicar/completar 10 issues com artigos (ou rascunhos) | T-03 | RN-02 | docs/drafts/* | 10 artigos Markdown | Limitado (sem auth; rascunhos salvos) |
| T-05 | Scaffold Vite + React + TS + Tailwind | T-02 | RF-15 | package.json, vite.config, tailwind | `npm run dev` funciona | Concluído |
| T-06 | Config centralizada | T-05 | RN-10 | src/config/app.config.ts | Config tipada | Concluído |
| T-07 | Tipos GitHub | T-05 | RF-01,RF-10 | src/types/github.ts | Interfaces | Concluído |
| T-08 | Serviço Axios | T-06,T-07 | RF-03..RF-14 | src/services/github.service.ts | Funções + erros | Concluído |
| T-09 | Hooks próprios | T-08 | RF-07 | src/hooks/* | useDebounce, useProfile, useIssues | Concluído |
| T-10 | Utils | T-07 | RF-09,RF-12 | src/utils/* | data, markdown, search | Concluído |
| T-11 | Componentes UI | T-10 | RF-08,RF-09 | src/components/* | 7 componentes | Concluído |
| T-12 | Páginas Home/Detalhe/404 | T-11 | RF-10..RF-16 | src/pages/* | Rotas funcionando | Concluído |
| T-13 | Rotas React Router | T-12 | RF-09,RF-10 | src/App.tsx | Navegação sem reload | Concluído |
| T-14 | Acessibilidade | T-12 | RF-16 | components/pages | labels, foco, aria-live | Concluído (básico) |
| T-15 | Responsividade | T-12 | RF-15 | components/pages | 375/768/1280 | Concluído (Tailwind) |
| T-16 | Testes automatizados (≥3 cenários) | T-13 | RF-07,RF-10,RF-13 | tests/* | Testes passando | Concluído (6 testes) |
| T-17 | Typecheck + build | T-16 | RNF | — | `tsc` e `vite build` OK | Concluído |
| T-18 | README + capturas | T-17 | — | README.md | Docs completas | Concluído (desktop) |
| T-19 | AI_USAGE.md | T-17 | — | docs/AI_USAGE.md | ≥3 evidências | Concluído |
| T-20 | Deploy GitHub Pages | T-17 | — | .github/workflows/* | URL registrada se OK | Pendente (Pages não habilitado) |
