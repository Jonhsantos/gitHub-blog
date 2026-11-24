# Tailwind CSS: Utility-First e Responsividade

## Conceito

Tailwind fornece classes utilitárias para estilizar sem CSS customizado.

## Exemplo

```html
<div class="flex flex-col gap-4 md:flex-row md:gap-6">
  <div class="rounded-lg bg-white p-4 shadow">Card</div>
</div>
```

## Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Responsividade no GitHub Blog

```html
<main class="mx-auto max-w-6xl px-4 py-6 md:px-8">
  <section class="grid grid-cols-1 gap-6 md:grid-cols-2"></section>
</main>
```

## Dark mode (opcional)

```html
<html class="dark">
```

## Dicas

- Use `focus:ring-2 focus:ring-blue-500` para foco visível.
- Evite rolagem horizontal com `overflow-x-hidden` no body.

## Referências

- [Tailwind Docs](https://tailwindcss.com/docs)
EOF