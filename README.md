# API Node.js com Sequelize e MariaDB

Este projeto é uma API RESTful construída com Node.js, Express, Sequelize e MariaDB. Ele inclui funcionalidades CRUD para gerenciar usuários e está configurado para ser executado em um ambiente Docker.

## 🚀 Funcionalidades

- CRUD completo para usuários:
  - Criar, listar, atualizar e deletar usuários.
- Validações de dados no modelo Sequelize.
- Configuração de banco de dados com suporte a múltiplos ambientes (`development`, `test`, `production`).
- Script para popular o banco de dados com dados iniciais.
- Integração com Docker para MariaDB e phpMyAdmin.

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado
- Docker e Docker Compose instalados

### Configuração do Ambiente

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   DB_HOST=127.0.0.1
   DB_USER=user
   DB_PASSWORD=sua_senha
   DB_DATABASE=database_development
   DB_PORT=3306
   ```

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- MariaDB
- Docker
- phpMyAdmin

## 📂 Estrutura do Projeto

- `.env`
- `.gitignore`
- `.sequelizerc`
- `app.js`
- `docker-compose.yml`
- `package.json`
- `popularDB.js`
- `bin/`
  - `www`
- `config/`
  - `db.js`
  - `dbconfig.json`
- `controllers/`
  - `userController.js`
- `database/`
  - `migrations/`
    - `20250329234912-create-user.js`
  - `seeders/`
- `public/`
- `src/`
  - `models/`
    - `index.js`
    - `user.js`
  - `routes/`
    - `index.js`
    - `users.js`

## 🏃 Como Executar

1. Suba os containers Docker:
   ```bash
   docker-compose up -d
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute as migrações do banco de dados:
   ```bash
   npx sequelize-cli db:migrate
   ```
4. Popule o banco de dados com dados iniciais:
   ```bash
   node popularDB.js
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```

Acesse a API em [http://localhost:3000](http://localhost:3000).

Acesse a API em http://localhost:3000.

🛠️ Endpoints da API
Usuários
GET /api/users - Lista todos os usuários
GET /api/users/:id - Retorna um usuário específico
POST /api/users - Cria um novo usuário
PUT /api/users/:id - Atualiza um usuário existente
DELETE /api/users/:id - Deleta um usuário

📝 Licença
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais informações.
