# TypeScript Estrito em Projetos React

## Por que strict

O modo estrito detecta erros em tempo de compilação: null/undefined, implicit any, etc.

## tsconfig recomendado

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## Exemplo: null safety

```ts
function saudacao(nome: string | null) {
  return nome ? `Olá, ${nome}` : "Olá, visitante";
}
```

## Interfaces e tipos

```ts
interface Usuario {
  login: string;
  bio: string | null;
}
```

## Generics

```ts
function primeiro<T>(lista: T[]): T | undefined {
  return lista[0];
}
```

## Boas práticas

- Preferir `interface` para objetos públicos.
- Evitar `any`; usar `unknown` quando necessário.
- Validar dados externos (API) com type guards.

## Referências

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
EOF