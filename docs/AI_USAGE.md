# AI_USAGE.md — Uso do OpenCode

## Evidência 1 — Instalação e autenticação do MCP do Figma

- **Contexto/Prompt:** "instale o mcp do figma" e "conecte".
- **Objetivo:** Conectar o servidor MCP oficial do Figma ao OpenCode para consultar o design de referência.
- **Resultado observado:** Servidor `figma` adicionado em `~/.config/opencode/opencode.json` apontando para `https://mcp.figma.com/mcp`; autenticação OAuth concluída com status `✓ figma connected`; ferramentas `tools.figma.*` disponibilizadas.
- **Referência:** commit `aa88ed1` (docs) e config global.

## Evidência 2 — Análise do design no Figma

- **Contexto/Prompt:** "valide se tem acesso a esse figma: https://www.figma.com/design/...".
- **Objetivo:** Confirmar acesso e extrair estrutura da Home e do detalhe.
- **Resultado observado:** `create_session` + `get_metadata` retornaram canvas `💻 Projeto` com frames `Blog` (1440×1709) e `Post` (1440×926), usados para orientar layout responsivo.
- **Referência:** sessão Figma `12ce2648-3f0c-4f3c-a6c3-7cb955d676a1`.

## Evidência 3 — Geração da documentação e scaffold

- **Contexto/Prompt:** Etapa 1 da tarefa (PRD/TECH/TASKS/AGENTS) e Etapa 3 (implementação).
- **Objetivo:** Criar SPECs, scaffold Vite e implementar componentes/páginas/testes.
- **Resultado observado:** 4 documentos commitados; projeto Vite + React + TS + Tailwind; 7 componentes, 3 páginas, 3 hooks, 6 testes passando; typecheck e build OK.
- **Referência:** commits `aa88ed1` e posteriores; `docs/`.
