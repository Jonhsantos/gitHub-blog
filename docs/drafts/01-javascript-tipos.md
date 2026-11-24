# JavaScript: Tipos de Dados e Estruturas

Publicado em 2026-11-20

JavaScript é uma linguagem dinamicamente tipada. Os valores podem ser de tipos primitivos ou objetos.

## Tipos primitivos

- `string`
- `number`
- `bigint`
- `boolean`
- `undefined`
- `symbol`
- `null`

## Exemplo

```js
const nome = "Jonhsantos";
const idade = 22;
const ativo = true;
console.log(typeof nome, typeof idade, typeof ativo);
```

## Estruturas de dados

- **Array**: lista ordenada e indexada.
- **Object**: coleção de pares chave/valor.
- **Map** e **Set**: estruturas modernas para associações e conjuntos únicos.

### Array

```js
const posts = ["React", "Vite", "TypeScript"];
posts.push("Tailwind");
console.log(posts.length); // 4
```

### Object

```js
const perfil = {
  login: "Jonhsantos",
  followers: 32,
};
console.log(perfil.login);
```

## Links úteis

- [MDN Web Docs](https://developer.mozilla.org/)
- [ECMAScript spec](https://tc39.es/ecma262/)

> Dica: prefira `const` e `let`; evite `var`.
