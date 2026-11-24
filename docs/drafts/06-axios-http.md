# Axios: Requisições HTTP e Tratamento de Erros

## Uso básico

```ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  timeout: 10000,
});
```

## GET com params

```ts
const { data } = await api.get("/search/issues", {
  params: { q: "repo:Jonhsantos/gitHub-blog is:issue", page: 1, per_page: 6 },
});
```

## Tratamento de erros

```ts
try {
  await api.get("/users/x");
} catch (err) {
  if (axios.isAxiosError(err)) {
    console.log(err.response?.status);
  }
}
```

## Cancelamento

```ts
const controller = new AbortController();
api.get("/x", { signal: controller.signal });
controller.abort();
```

## Rate limit

Respeite `Retry-After` e `X-RateLimit-Reset`. Em 403/429, exiba mensagem e permita retry.

## Referências

- [Axios Docs](https://axios-http.com/docs/intro)
EOF