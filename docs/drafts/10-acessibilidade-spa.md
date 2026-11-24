# Acessibilidade em SPAs

## Princípios

- Labels reais em inputs.
- Foco visível.
- Contraste adequado.
- Mensagens de estado anunciadas (`aria-live`).
- Navegação por teclado.

## Exemplos

```html
<label for="busca">Buscar publicações</label>
<input id="busca" type="search" aria-describedby="ajuda" />
<p id="ajuda" class="sr-only">Digite para filtrar</p>
```

## Estados

Use `role="status"` e `aria-live="polite"` para loading/erro/vazio.

## Página 404

Inclua link de retorno à Home.

## Testes

Use Testing Library com `getByRole`, `getByLabelText`.

## Referências

- [WCAG 2.1](https://www.w3.org/WAI/standards-guidelines/wcag/)
