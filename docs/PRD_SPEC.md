# PRD / SPEC — GitHub Blog

## 1. Contexto

Aplicação web (SPA) que exibe um blog público a partir das **issues** de um repositório GitHub. O perfil do autor vem da API pública do GitHub (`GET /users/{username}`) e cada publicação é uma issue do repositório configurado (`owner/repo`). A aplicação deve funcionar sem token, backend, banco de dados, login ou edição de posts.

- **Repositório fonte:** `Jonhsantos/gitHub-blog` (público)
- **Usuário/perfil:** `Jonhsantos`
- **Idioma da interface:** português do Brasil (pt-BR)
- **Referência visual:** Figma "GitHub Blog (Community) - Copy - cópia" (node `0:1`)

## 2. Problema

Estudantes e recrutadores precisam visualizar, em um layout amigável e responsivo, as publicações técnicas do autor a partir de um repositório GitHub, com busca, paginação e leitura individual de cada post, sem depender de infraestrutura própria.

## 3. Público-alvo

- Autor do blog (estudante de desenvolvimento web).
- Recrutadores e colegas que acessam o link público.
- Avaliadores da disciplina.

## 4. Objetivo

Entregar uma SPA responsiva que liste e exiba posts (issues) de um repositório GitHub público, com perfil do autor, busca com debounce e paginação remota, leitura em Markdown e estados de carregamento/erro/acesso direto.

## 5. Fluxo principal

`Home → Busca → Detalhe → Voltar`

1. Usuário acessa a Home: perfil do autor + lista de posts.
2. Usuário pode buscar por texto (debounce 500 ms ou Enter).
3. Usuário clica em um card: navega para `/post/:number` sem recarregar a página.
4. Na página de detalhe: lê o Markdown, vê metadados, pode voltar à lista preservando termo/página ou ir para a Home se acesso direto.
5. Ao voltar, a lista mantém o termo de busca e a página anteriores.

## 6. Requisitos Funcionais (RF)

Cada RF possui critério verificável.

- **RF-01** Consultar `GET /users/{username}` e exibir avatar (com `alt`), nome, bio, `@username`, seguidores e link de perfil. *Critério:* perfil renderizado com dados reais; valores nulos não quebram a UI (fallbacks).
- **RF-02** Tratar valores nulos do perfil (bio, name, avatar). *Critério:* se `bio`/`name` for `null`, exibir fallback ("Sem bio" / username); avatar com alt descritivo.
- **RF-03** Usar as issues reais do repositório. Com busca vazia, mostrar issues abertas e fechadas em ordem decrescente de criação. *Critério:* lista ordenada por `created_at` desc; inclui issues abertas e fechadas.
- **RF-04** Excluir pull requests da listagem. *Critério:* nenhum item com `pull_request` aparece.
- **RF-05** Buscar por texto no título e no corpo usando `GET /search/issues` com qualificador `repo:owner/repo is:issue`. *Critério:* resultados correspondem ao termo; paginação remota com `page` e `per_page=6`.
- **RF-06** Normalizar espaços e tratar a entrada como texto (sem alterar qualificadores). *Critério:* termo com múltiplos espaços normalizado; entrada não consegue injetar qualificadores.
- **RF-07** Debounce de 500 ms, confirmação imediata com Enter, volta à página 1 quando o termo mudar. *Critério:* teste automatizado valida debounce e paginação.
- **RF-08** Componentes: `ProfileCard`, `SearchInput`, `IssueCard`, `IssueList`, `Pagination`, `LoadingState`, `ErrorState`. *Critério:* todos implementados e reutilizados.
- **RF-09** Cada card mostra título, data relativa em pt-BR, resumo legível sem Markdown cru, fallback para corpo ausente e número de comentários. Navegação para `/post/:number` sem reload. *Critério:* rota alterada sem recarregar página.
- **RF-10** Detalhe consulta `GET /repos/{owner}/{repo}/issues/{number}`, inclusive em acesso direto. *Critério:* URL direta carrega o post.
- **RF-11** Rejeitar números inválidos e resultados que sejam pull requests. *Critério:* exibe estado de erro/404; PR retorna erro.
- **RF-12** Renderizar Markdown com `react-markdown`, links seguros, sem HTML cru. Mostrar título, autor, data, comentários, "Ver no GitHub" e "Voltar". Preservar termo/página ao voltar; acesso direto → Voltar leva à Home. *Critério:* Markdown renderizado; links seguros.
- **RF-13** Distinguir carregamento, sucesso, vazio, 404, falha de rede, outros erros HTTP e rate limit (403/429). *Critério:* estados distintos com mensagens.
- **RF-14** Oferecer "Tentar novamente" nas falhas recuperáveis. Respeitar `Retry-After` ou `X-RateLimit-Reset`. Timeout, cancelamento de consultas obsoletas, impedir respostas antigas sobrescreverem resultados atuais. *Critério:* ações de recuperação funcionam; testes cobrem 404 e rate limit.
- **RF-15** Tailwind adaptando as duas telas a 375/390, 768 e 1280/1440 px. Sem rolagem horizontal da página; rolagem dentro de blocos de código largos. *Critério:* verificado em 3 larguras.
- **RF-16** Acessibilidade: labels reais, foco visível, contraste, nomes acessíveis, mensagens de estado anunciadas, página 404 com link de retorno. *Critério:* navegação por teclado funcional.

## 7. Regras de Negócio (RN)

1. **RN-01** Fonte real pela API pública do GitHub.
2. **RN-02** Repositório público com pelo menos dez issues.
3. **RN-03** Exclusão de pull requests.
4. **RN-04** Busca vazia = ordem cronológica decrescente.
5. **RN-05** Paginação remota (`page`, `per_page`).
6. **RN-06** Normalização e codificação segura da busca.
7. **RN-07** Resumo legível e Markdown seguro.
8. **RN-08** Distinção dos estados da API.
9. **RN-09** Ausência de credenciais na SPA.
10. **RN-10** Configuração centralizada (owner, username, repo, pageSize).

## 8. Escopo

Incluído: Home, busca, paginação, detalhe, perfil, estados, responsividade, acessibilidade, testes, docs, deploy estático.

## 9. Exclusões

Sem autenticação, backend, banco de dados, edição/criação de posts, token no cliente, SSR.

## 10. Requisitos Não Funcionais

- TypeScript estrito.
- React + Vite.
- Tailwind CSS.
- Axios para HTTP.
- React Router.
- react-markdown.
- Timeout em requisições; cancelamento de consultas obsoletas.
- Sem credenciais no código/README/env `VITE_*`.
- Build estático.

## 11. Decisões de interface (Figma)

- Paleta: fundo claro, cards brancos, acento azul/verde (a confirmar via inspeção).
- Tipografia: títulos em negrito, corpo regular.
- Layout: 1440 px desktop; adaptar para 768 e 375/390.
- Cards de post em grade 2 colunas (desktop), 1 coluna (mobile).
- Header com logo "GITHUB BLOG" e barra de busca.
- Perfil com avatar circular, nome, bio, username, empresa, seguidores e link GitHub.

> Nota: comparação visual detalhada registrada como pendente até inspeção completa do protótipo.
EOF