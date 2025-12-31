
## 🧬 Bio MVC Node.js API

Uma API robusta e organizada desenvolvida em **Node.js**, estruturada sob o padrão de arquitetura **MVC**. O projeto foi desenhado para gerenciar dados biográficos ou perfis de forma escalável, garantindo uma clara separação de responsabilidades entre a lógica de negócios, o armazenamento de dados e as rotas de navegação.

## 🏗️ Arquitetura MVC

A escolha do padrão MVC permite que este projeto seja facilmente mantido e expandido:
* **Model:** Gerencia a lógica de dados e a comunicação com o banco de dados.
* **View:** (Neste caso, as respostas JSON) Responsável pelo que é retornado ao cliente.
* **Controller:** O cérebro da aplicação, que processa as requisições, interage com o Model e define a resposta.

## 🚀 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução para o JavaScript no servidor.
* **Express.js**: Framework para construção de APIs e gerenciamento de rotas.
* **JavaScript (ES6+)**: Utilizando as funcionalidades mais modernas da linguagem.
* **CORS**: Habilitado para permitir conexões de diferentes origens (Front-end).
* **Dotenv**: Proteção de chaves e variáveis sensíveis do sistema.
* **Nodemon**: Ferramenta de produtividade para reinicialização automática durante o desenvolvimento.

## 📂 Estrutura do Projeto

bio-mvc-nodejs-api/
├── src/
│   ├── config/      # Configurações de banco de dados e ambiente
│   ├── controllers/ # Funções de controle das rotas (Lógica principal)
│   ├── models/      # Esquemas e modelos de dados
│   ├── routes/      # Definição dos caminhos da API
│   └── server.js    # Arquivo principal (Ponto de entrada)
├── .env             # Variáveis de ambiente
├── .gitignore       # Arquivos ignorados pelo Git
└── package.json     # Scripts e dependências

## 📋 Endpoints Principais

A API oferece os seguintes recursos para gestão de biografias: MétodoEndpointDescrição
GET/api/bios Retorna todos os perfis cadastrados
GET/api/bios/:id Retorna os detalhes de um perfil específico.
POST/api/bios Cria uma nova entrada biográfica.
PUT/api/bios/:id Atualiza os dados de um perfil existente.
DELETE/api/bios/:idRemove um registro do sistema.

## 🔧 Como Rodar o Projeto

Clone o repositório:Bashgit clone [https://github.com/mvdevelop/bio-mvc-nodejs-api.git](https://github.com/mvdevelop/bio-mvc-nodejs-api.git)
cd bio-mvc-nodejs-api
Instale as dependências:Bashnpm install
Inicie o servidor:Bashnpm start # ou npm run dev para modo de desenvolvimento
A API estará disponível em: http://localhost:3000 (ou na porta definida no seu .env).

## 👨‍💻 AutorDesenvolvido por mvdevelop.

GitHub: @mvdevelop

## 📄 Licença
Este projeto está sob a licença MIT.
