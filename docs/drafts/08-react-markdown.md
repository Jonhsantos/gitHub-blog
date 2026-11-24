# Markdown Seguro com react-markdown

## Uso

```tsx
import ReactMarkdown from "react-markdown";

<ReactMarkdown>{conteudo}</ReactMarkdown>
```

## Segurança

Não habilite `rehype-raw`. Links devem abrir em nova aba com `rel="noopener noreferrer"`.

## Componentes customizados

```tsx
<ReactMarkdown
  components={{
    a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
    code: ({ node, ...props }) => <code className="bg-gray-100 px-1 rounded" {...props} />,
  }}
>
  {conteudo}
</ReactMarkdown>
```

## Resumo legível

Para cards, extraia texto do Markdown removendo marcadores e trunque.

## Referências

- [react-markdown](https://github.com/remarkjs/react-markdown)
