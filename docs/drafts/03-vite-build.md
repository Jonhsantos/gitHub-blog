# Vite: Build Rápido para Front-end

## O que é Vite

Vite é um bundler/dev server moderno com HMR instantâneo e build otimizado via Rollup.

## Criando um projeto

```bash
npm create vite@latest meu-app -- --template react-ts
cd meu-app
npm install
npm run dev
```

## Configuração

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/gitHub-blog/",
});
```

## Variáveis de ambiente

Apenas variáveis prefixadas com `VITE_` são expostas ao cliente. **Nunca** coloque segredos em `VITE_*`.

## Build e preview

```bash
npm run build
npm run preview
```

## Dicas

- Use `import.meta.env` para acessar env.
- Configure `base` para GitHub Pages.

## Links

- [Vite Guide](https://vitejs.dev/guide/)
