# 🧬 Bio MVC Node.js API

Uma API robusta e organizada desenvolvida em **Node.js + TypeScript**, estruturada sob o padrão de arquitetura **MVC**. O projeto foi desenhado para gerenciar dados de forma escalável, garantindo uma clara separação de responsabilidades entre a lógica de negócios, o armazenamento de dados e as rotas de navegação.

> **Nota:** Este repositório foi migrado de JavaScript para **TypeScript**. O código-fonte do backend está em `backend/src` e do frontend em `frontend/src`.

## 🏗️ Arquitetura MVC

A escolha do padrão MVC permite que este projeto seja facilmente mantido e expandido:

* **Model:** Gerencia a lógica de dados e a comunicação com o banco de dados (MongoDB via Mongoose).
* **View:** Neste caso, as respostas JSON retornadas ao cliente.
* **Controller:** O cérebro da aplicação, que processa as requisições, interage com o Model/Repository e define a resposta.

O projeto também usa o padrão **Repository** para isolar o acesso a dados.

## 🚀 Tecnologias Utilizadas

* **Node.js** — ambiente de execução.
* **TypeScript** — tipagem estática e código mais seguro.
* **Express.js** — framework para construção de APIs e gerenciamento de rotas.
* **MongoDB + Mongoose** — banco de dados NoSQL e ODM.
* **CORS** — habilitado para permitir conexões de diferentes origens (frontend).
* **Dotenv** — proteção de chaves e variáveis sensíveis do sistema.
* **Vitest + Supertest + mongodb-memory-server** — testes de integração.
* **React 19 + Vite + Tailwind CSS** — frontend (em `frontend/`).

## 📂 Estrutura do Projeto

```
bio-mvc-nodejs-api/
├── backend/
│   ├── bin/
│   │   └── server.ts        # Ponto de entrada do servidor
│   ├── src/
│   │   ├── config/          # Configurações de banco de dados e ambiente
│   │   ├── controllers/     # Funções de controle das rotas (lógica principal)
│   │   ├── models/          # Esquemas e modelos de dados (Mongoose)
│   │   ├── repositories/    # Acesso a dados (isolamento do banco)
│   │   ├── routes/          # Definição dos caminhos da API
│   │   ├── validators/      # Validações (FluentValidator)
│   │   └── app.ts           # Configuração do Express
│   ├── tests/               # Testes de integração (Vitest)
│   ├── .env.example         # Exemplo de variáveis de ambiente
│   └── tsconfig.json        # Configuração do TypeScript
├── frontend/                # Aplicação React + Vite + TypeScript
└── README.md
```

## 📋 Endpoints Principais

A API oferece os seguintes recursos:

| Método | Endpoint              | Descrição                                        |
|--------|-----------------------|--------------------------------------------------|
| GET    | `/`                   | Informações da API (nome e versão)               |
| GET    | `/products`           | Retorna todos os produtos ativos                 |
| GET    | `/products/:slug`     | Retorna detalhes de um produto por slug          |
| GET    | `/products/admin/:id` | Retorna detalhes de um produto por ID            |
| GET    | `/products/tags/:tag` | Retorna produtos por tag                         |
| POST   | `/products`           | Cria um novo produto                             |
| PUT    | `/products/:id`       | Atualiza os dados de um produto existente        |
| DELETE | `/products/:id`       | Remove um registro do sistema                    |

### Exemplo de payload (POST /products)

```json
{
  "title": "Notebook Gamer",
  "slug": "notebook-gamer",
  "description": "Notebook com GPU dedicada",
  "price": 4999.90,
  "active": true,
  "tags": ["eletronicos", "gamer"]
}
```

## 🔧 Como Rodar o Projeto

### Pré-requisitos

* Node.js 18+
* MongoDB (local ou Atlas)

### Backend

```bash
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env e preencha a MONGODB_URI com a sua conexão

# Modo desenvolvimento (com hot-reload via tsx watch)
npm run dev

# Ou compile e rode em produção
npm run build
npm start
```

A API estará disponível em: `http://localhost:3000` (ou na porta definida no seu `.env`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`.

### Testes

```bash
cd backend
npm test          # roda todos os testes (Vitest)
npm run test:watch  # modo watch
```

Os testes de integração usam `mongodb-memory-server`, então **não exigem** um MongoDB real em execução.

## 🧪 Scripts úteis

| Script                  | Descrição                                         |
|-------------------------|---------------------------------------------------|
| `npm run dev` (backend) | Roda o servidor com hot-reload (tsx watch)        |
| `npm run build`         | Compila o TypeScript para `dist/`                 |
| `npm start`             | Executa o build compilado (`dist/bin/server.js`)  |
| `npm test`              | Roda os testes com Vitest                         |
| `npm run build` (front) | Compila o frontend para produção (Vite)           |

## 🔒 Segurança

* **Credenciais**: Nenhuma credencial está hardcoded no código. Todas as variáveis sensíveis (como `MONGODB_URI`) devem ser definidas no arquivo `.env` (não versionado). Veja o `.env.example` para referência.
* Se você clonou este repositório de uma versão antiga que continha credenciais no código, **rotacione-as imediatamente**.

## 👨‍💻 Autor

Desenvolvido por **mvdevelop**.

GitHub: [@mvdevelop](https://github.com/mvdevelop)

## 📄 Licença

Este projeto está sob a licença MIT.
