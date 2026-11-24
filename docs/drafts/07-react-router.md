# React Router: Navegação SPA

## Rotas

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post/:number" element={<PostDetail />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

## Parâmetros

```tsx
import { useParams } from "react-router-dom";
const { number } = useParams();
```

## Navegação programática

```tsx
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
navigate("/post/1");
```

## Preservar estado ao voltar

Use `location.state` ou query params para manter termo/página.

## Acessibilidade

Garanta foco no conteúdo principal após navegação.

## Referências

- [React Router](https://reactrouter.com/)
EOF