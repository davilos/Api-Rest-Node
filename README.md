# [![Logo](https://skillicons.dev/icons?i=nodejs)](https://skillicons.dev) API REST Transactions

Esta API funciona como transações bancárias. Podendo criar uma transação, buscar todas as transações ou apenas uma, e um resumo contendo
a quantidade de dinheiro a qual foram usados nas transações. Utilizei cookies (com duração de 7 dias) para que o app pudesse indentificar o usuário.

## Como iniciar
```
# Dentro da pasta do projeto
npm install

# Executando as migrações para a criação de tabelas no DB
npx knex migrate:latest

# Iniciando o projeto
npm run dev
```

## Rodar testes
```
# Para rodar os testes E2E
npm run test
```

## Tecnologias usadas para a criação do projeto
- Node.js
- TypeScript
- Fastify
- Knex
- Zod
- Vitest
- Tsup
- 

### RF - Requisitos Funcionais

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas as transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;

### RN - Regras de Negócio

- [x] A transação pode ser do tipo crédito que somará ao valor total, ou débito que
  subtrairá;
- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuário só pode visualizar apenas as transações a qual ele criou;
