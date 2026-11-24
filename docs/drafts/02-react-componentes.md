# React: Componentes, Props e Estado

## Introdução

React é uma biblioteca para construir interfaces declarativas. A UI é composta por componentes reutilizáveis.

## Componentes funcionais

```tsx
type Props = { titulo: string };

export function Card({ titulo }: Props) {
  return <article><h2>{titulo}</h2></article>;
}
```

## Props

Props são somente leitura. Elas fluem do pai para o filho.

## Estado com useState

```tsx
import { useState } from "react";

export function Contador() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Listas e keys

```tsx
const itens = ["a", "b", "c"];
<ul>
  {itens.map((i) => <li key={i}>{i}</li>)}
</ul>
```

## Boas práticas

- Componentes pequenos e focados.
- Evitar mutação de estado.
- Usar keys estáveis.

## Referências

- [React Docs](https://react.dev/)
EOF