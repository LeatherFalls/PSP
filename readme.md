
# PSP

Uma aplicação Payment Service Provider(PSP) full stack.




## Rodando localmente

Clone o projeto

```bash
  https: git clone https://github.com/LeatherFalls/PSP.git
  ssh: git clone git@github.com:LeatherFalls/PSP.git
```


## Instalação(backend)

```bash
  cd app/backend
  npm install
```

## Instalação(frontend)
```bash
  cd app/frontend
  npm install
```

## Instalação com docker
```bash
  cd app/
  docker-compose up
```

## Rodando o projeto

#### Backend

```bash
  cd app/backend
  npm start ou npm run start:dev (watch mode)
```

#### Frontend

```bash
  cd app/frontend
  npm run dev
```

### Obs: O frontend foi desenvolvido com resolução 360x740

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PGHOST=localhost`

`PGPORT=5432`

`PGUSER=seuusuario`

`PGPASSWORD=suasenha`

`PGDATABASE=seubanco`

`JWT_SECRET=suasecret`

## Rodando os testes

Para rodar os testes, rode os seguinte comandos

```bash
  cd app/backend
  npm run test
```


## Documentação da API

### Usuários

#### Cria um novo usuário e uma conta associada a ele

```http
  POST /users
```

| Body   | Tipo       |
| :---------- | :--------- |
| `username, password`      | `string, string` |

#### Faz login como usuário

```http
  POST /login
```

| Body   | Tipo       |
| :---------- | :--------- |
| `username, password`      | `string, string` |

#### Retorna todos os usuários

```http
  GET /users
```

#### Retorna o usuário passando um parâmetro

```http
  GET /users/${param}
```

| Parâmetro   | Tipo       |
| :---------- | :--------- |
| `id ou username`      | `string` |

#### Atualiza usuário

```http
  PUT /users/${id}
```

| Parâmetro   | Tipo       | Body   | Tipo |
| :---------- | :--------- | :------| :------ |
| `id`      | `string` |  `username, password`  | `string, string` |

#### Deleta usuário e sua conta associada

```http
  DELETE /users/${id}
```

| Parâmetro   | Tipo       |
| :---------- | :--------- |
| `id`      | `string` |

### Contas

#### Retorna uma conta passando o id como parâmetro

```http
  GET /accounts/${id}
```

| Parâmetro   | Tipo       |
| :---------- | :--------- |
| `id`      | `string` |

### Transações

#### Cria uma nova transação passando o usuário que sofrerá o cashIn e o valor no body da requisição, além de o id de quem sofrerá cashOut como parâmetro da uel

```http
  POST /transactions/${id}
```
| Parâmetro   | Tipo       | Body   | Tipo |
| :---------- | :--------- | :------| :------ |
| `id`      | `string` |  `username, value`  | `string, number` |

#### Filtra transações do tipo cashIn passando data mínima, data máxima e id de usuário como parâmetro da url

```http
  GET /transactions/cashIn/filterByDate/:id/q
  Exemplo: /transactions/cashIn/filterByDate/:id/q?=minDate&maxDate
```
| Parâmetro   | Tipo       | Body   | Tipo |
| :---------- | :--------- | :------| :------ |
| `id`      | `string` |  `minDate, maxDate`  | `string, string` |

#### Filtra transações do tipo cashOut passando data mínima, data máxima e id de usuário como parâmetro da url

```http
  GET /transactions/cashOut/filterByDate/:id/q
  Exemplo: /transactions/cashOut/filterByDate/:id/q?=minDate&maxDate
```
| Parâmetro   | Tipo       | Body   | Tipo |
| :---------- | :--------- | :------| :------ |
| `id`      | `string` |  `minDate, maxDate`  | `string, string` |

## Stack utilizada

**Front-end:** React, Typescrypt, CSS

**Back-end:** Node, NestJS, Typescrypt, TypeORM

**Banco:** Postgres

