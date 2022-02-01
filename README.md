# Inventory Control API

## Instruções

Para iniciar a API na variável de ambiente você tem que mudar a variável:

```
DATABASE_URL=mysql://user:password@linkdatabase/nestdb
```

- 'user' para nome do usuario do banco de dados.
- 'password' para a senha do banco de dados.
- 'linkdatabase'para o link do banco de dados, caso seja local é só colocar localhost

Após isso rode o comando no termninal:

```
yarn install
```

ou

```
npm install
```

Para instalar as dependencias do projeto, logo após:

```
yarn prisma migrate dev
```

ou

```
npm run prisma migrate dev
```

Para executar as migrations e os seeds do banco de dados, por fim execute:

```
yarn start
```

ou

```
npm run start
```

Para executar a API na porta 3333.

Usuário ADM

ADM_USERNAME=sistematxai
ADM_PASSWORD=123456789
