# GitHub REST API: Issues e Perfil

## Perfil

`GET /users/{username}` retorna avatar, nome, bio, followers, html_url.

## Issues do repositório

`GET /repos/{owner}/{repo}/issues/{number}` retorna uma issue.

## Busca

`GET /search/issues?q=repo:owner/repo is:issue <termo>&sort=created&order=desc`

## Paginação

Use `page` e `per_page`. O fim da lista é inferido quando `items.length < per_page`.

## Rate limit

Headers `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After`.

## Referências

- [GitHub REST](https://docs.github.com/en/rest)
EOF