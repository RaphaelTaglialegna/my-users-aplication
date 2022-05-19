## Aplicação de Usuários

<img src="https://i.ibb.co/wNj6qJP/Screenshot-20220519-195153.png" alt="Screenshot-20220519-195153" border="0">  

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/RaphaelTaglialegna/backendContacts">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/RaphaelTaglialegna/backendContacts">
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/RaphaelTaglialegna/backendContacts">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/RaphaelTaglialegna/backendContacts">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/RaphaelTaglialegna/backendContacts">
</p>

### Sobre

Aplicação que lista, armazena, valida, modifica e exclui um usuário padronizado a partir de requisições em um banco de dados relacional (Postgres).

### Desenvolvimento

Frontend, Backend e Banco de Dados:
- TypeScript.
- React.
- Node.js.
- ORM Sequelize.
- Testes de Integração com Mocha, Chai e Sinon.
- Banco de dados PostgreSQL.
- Containers Docker das Aplicação e banco de Dados.

### Instalação 

Para rodar esse projeto, existe duas formas: 

1 - Rodando localmente com o PostgreSQL instalado previamente usando, scripts:  
``` 
cd backend
npm install // para instalar as dependências
npm start // para inicializar a aplicação e criar e implementar o banco de dados.

cd frontend
npm install // para instalar as dependências
npm start // para inicializar a pagina.

```
2 - Rodando com o Docker Compose e utilizando, nele tanto a aplicação quanto o banco de dados estão containirizados.  
``` 
npm install // para instalar as dependências

npm run compose:up // para inicializar a aplicação e criar e implementar o banco de dados.

docker container ls // para verificar as portas usadas no localhost são: 3000 do frontend e 3001 do backend.
```

#### Instruções da aplicação. 

Rotas e requisições: 

- GET para `/users`, vai retornar todos os usuários.
- GET para `/users/:id`, vai retornar apenas um usuário com um ID válido.
- POST para `/users, para criar um usuário.
- PUT para `/users/:id`, para editar um usuário com um ID válido.
- DELETE para `/users/:id`, para excluir um usuário com um ID válido.

### Requisitos da Aplicação 

Cadastro de usuário seguindo o seguinte modelo (* campos obrigatórios): 
  - Contato 
    - Nome Completo*
    - E-mail*
    - Password*

### Requisitos dos Testes
Rode o `npm test` para ver os testes na pasta backend.


