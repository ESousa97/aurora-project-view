// src/data/staticData.ts - Dados estáticos baseados no exemplo fornecido
import { ProjectCard, Category } from '@/types';

export const staticProjects: ProjectCard[] = [
  {
    id: 6,
    titulo: "API ALURABOOKS",
    descricao: "API fake mockada JWT e catálogo de livros para testes e protótipos.",
    imageurl: "",
    categoria: "JAVASCRIPT",
    data_criacao: "2025-04-11T20:47:30.740Z",
    data_modificacao: "2025-04-11T20:49:09.996Z",
    conteudo: `---

# 📚 API AluraBooks – Fake REST API com JWT e HTTPS

![Banner do Projeto](thumbnail.png)

**AluraBooks API** é uma API REST mockada, criada com \`json-server\` e autenticação via **JWT**, ideal para simular um backend completo em aplicações frontend de e-commerce ou catálogos digitais. Ela simula livros, autores, categorias, pedidos e autenticação, tudo isso rodando em HTTPS local via certificado próprio.

---

## 🚀 Funcionalidades

✅ Mock de endpoints REST com \`json-server\`  
✅ Autenticação com JSON Web Token (JWT)  
✅ Criação e login de usuários  
✅ Endpoints públicos (livros, categorias, lançamentos, mais vendidos)  
✅ Proteção de rotas privadas via token  
✅ HTTPS com \`spdy\` (TLS/SSL local incluído)  
✅ Banco de dados simulado com \`database.json\` e \`usuarios.json\`  
✅ Servidor customizado com middleware de autenticação

---

## 📦 Instalação

\`\`\`bash
git clone https://github.com/ESousa97/api-alurabooks.git
cd api-alurabooks
npm install
npm run start-auth
\`\`\`

A API será exposta em:

\`\`\`
https://localhost:8000
\`\`\`

---

## 🔐 Endpoints de Autenticação

### Registro

\`\`\`http
POST /public/registrar
\`\`\`

**Body:**

\`\`\`json
{
  "nome": "Vinicios Neves",
  "email": "vinicios@alura.com.br",
  "senha": "123456",
  "endereco": "Rua Vergueiro, 3185",
  "complemento": "Vila Mariana",
  "cep": "04101-300"
}
\`\`\`

> ⚠️ O campo \`email\` é único.

---

### Login

\`\`\`http
POST /public/login
\`\`\`

**Body:**

\`\`\`json
{
  "email": "vinicios@alura.com.br",
  "senha": "123456"
}
\`\`\`

**Response:**

\`\`\`json
{
  "access_token": "<JWT_TOKEN>",
  "user": { ...dados do usuário... }
}
\`\`\`

---

### Headers para autenticação

Para acessar rotas privadas, envie o token:

\`\`\`http
Authorization: Bearer <JWT_TOKEN>
\`\`\`

---

## 📚 Rotas públicas

- \`GET /public/lancamentos\`  
- \`GET /public/mais-vendidos\`  
- \`GET /public/docs\` – 📄 visualização HTML simples da documentação  
- \`GET /livros\`, \`GET /categorias\`, \`GET /autores\` (sem token)

---

## 🔒 Rotas protegidas

Qualquer rota fora de \`/public\`, \`/livros\`, \`/categorias\` ou \`/autores\` requer um token válido.  
Tentativas sem token resultam em \`401 Unauthorized\`.

---

## 📁 Estrutura do projeto

\`\`\`bash
├── database.json       # Livros, autores, categorias e pedidos
├── usuarios.json       # Simula usuários registrados
├── server.js           # Servidor customizado com autenticação
├── server.crt/key      # Certificado SSL para HTTPS local
├── package.json        # Dependências e scripts
└── thumbnail.png       # Imagem de capa para o projeto
\`\`\`

---

## 📘 Recomendado para

🔸 Estudos de autenticação com JWT  
🔸 Integrações com front-end em React, Vue, Angular  
🔸 Protótipos de e-commerce e catálogo de livros  
🔸 Cursos e formações (ex: Formação Front-End da Alura)

---

## 💻 Desenvolvido por

> José Enoque — [github.com/ESousa97](https://github.com/ESousa97)
> 👨‍💼 [LinkedIn - Enoque Sousa](https://www.linkedin.com/in/enoque-sousa-bb89aa168/)

---`
  },
  {
    id: 7,
    titulo: "API NODEJS",
    descricao: "API Livraria com Node.js, Express e MongoDB",
    imageurl: "",
    categoria: "JAVASCRIPT",
    data_criacao: "2025-04-11T21:43:28.283Z",
    data_modificacao: "2025-04-11T21:43:28.283Z",
    conteudo: `---

# 🚀 API Livraria com Node.js, Express e MongoDB

![API Livros e Autores - RESTful com MongoDB](https://raw.githubusercontent.com/ESousa97/3266-express-mongo/main/.github/thumbnail.png)

> 🔗 Repositório: [github.com/ESousa97/3266-express-mongo](https://github.com/ESousa97/3266-express-mongo)  
> 👤 Desenvolvedor: [José Enoque Sousa](https://www.linkedin.com/in/enoque-sousa-bb89aa168/)

---

## 📚 Sobre o projeto

Uma API RESTful criada com Node.js, Express e MongoDB para gerenciar uma livraria. O sistema permite o **CRUD completo de livros e autores**, com endpoints organizados, validações simples e integração com banco de dados MongoDB via Mongoose.

Ideal para quem está começando com back-end em Node.js ou quer prototipar um sistema real com persistência de dados e boas práticas de arquitetura.

---

## 🧩 Tecnologias utilizadas

- **Node.js** – Plataforma principal da API  
- **Express.js** – Framework leve e eficiente para rotas e middlewares  
- **MongoDB** – Banco de dados NoSQL  
- **Mongoose** – ODM para modelagem de dados no Mongo  
- **dotenv** – Configuração de variáveis de ambiente  
- **Nodemon** – Hot reload para desenvolvimento  

---

## 📁 Estrutura do projeto

\`\`\`bash
.
├── server.js                    # Ponto de entrada da aplicação
├── .env                         # String de conexão com o MongoDB
├── src
│   ├── app.js                   # Inicialização do Express e rotas
│   ├── config/
│   │   └── dbConnect.js         # Conexão com o MongoDB
│   ├── controllers/            # Lógica de negócio
│   │   ├── autorController.js
│   │   └── livroController.js
│   ├── models/                 # Schemas Mongoose
│   │   ├── Autor.js
│   │   └── Livros.js
│   └── routes/                 # Rotas REST
│       ├── autoresRoutes.js
│       ├── livrosRoutes.js
│       └── index.js            # Agrupador de rotas
\`\`\`

---

## 📌 Funcionalidades disponíveis

### ✅ Autores

- \`GET /autores\` – Lista todos os autores  
- \`GET /autores/:id\` – Retorna autor por ID  
- \`POST /autores\` – Cadastra novo autor  
- \`PUT /autores/:id\` – Atualiza um autor existente  
- \`DELETE /autores/:id\` – Exclui autor  

### 📗 Livros

- \`GET /livros\` – Lista todos os livros  
- \`GET /livros/:id\` – Retorna livro por ID  
- \`GET /livros/busca?editora=\` – Lista livros por editora  
- \`POST /livros\` – Cadastra novo livro  
- \`PUT /livros/:id\` – Atualiza um livro existente  
- \`DELETE /livros/:id\` – Exclui livro  

### 🌐 Rota raiz

- \`GET /\` – Retorna mensagem de boas-vindas

---

## ⚙️ Como rodar localmente

\`\`\`bash
# 1. Clone o projeto
git clone https://github.com/ESousa97/3266-express-mongo.git
cd 3266-express-mongo

# 2. Instale as dependências
npm install

# 3. Configure o arquivo .env
DB_CONNECTION_STRING=mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/<banco>

# 4. Inicie o servidor
npm run dev

# Acesse em: http://localhost:3000
\`\`\`

---

## 👨‍💻 Autor

Desenvolvido por **José Enoque Sousa**  
🔗 [LinkedIn](https://www.linkedin.com/in/enoque-sousa-bb89aa168/) | 💻 [GitHub](https://github.com/ESousa97)

---`
  },
  {
    id: 4,
    titulo: "ALURA BOOK",
    descricao: "Projeto de livraria digital com catálogo interativo",
    imageurl: "",
    categoria: "REACT",
    data_criacao: "2025-03-15T10:30:00.000Z",
    data_modificacao: "2025-03-20T15:45:00.000Z",
    conteudo: `---

# 📖 AluraBook - Livraria Digital

Um projeto de livraria digital desenvolvido com React, apresentando um catálogo interativo de livros com funcionalidades modernas.

## 🚀 Tecnologias

- React 18
- TypeScript
- Styled Components
- React Router

## 📋 Funcionalidades

✅ Catálogo de livros  
✅ Busca e filtros  
✅ Carrinho de compras  
✅ Interface responsiva  

---

## 💻 Desenvolvido por José Enoque

---`
  },
  {
    id: 8,
    titulo: "REACT PORTFOLIO",
    descricao: "Portfolio pessoal desenvolvido em React com animações",
    imageurl: "",
    categoria: "REACT", 
    data_criacao: "2025-02-10T14:20:00.000Z",
    data_modificacao: "2025-02-15T16:30:00.000Z",
    conteudo: `---

# 🎨 React Portfolio

Portfolio pessoal desenvolvido com React e animações modernas para apresentar projetos e habilidades.

## 🛠️ Stack

- React + TypeScript
- Framer Motion
- Tailwind CSS
- React Router DOM

## ✨ Recursos

✅ Animações fluidas  
✅ Design responsivo  
✅ Tema escuro/claro  
✅ Seções organizadas  

---`
  },
  {
    id: 9,
    titulo: "PYTHON DATA ANALYSIS",
    descricao: "Análise de dados com Python, Pandas e visualizações",
    imageurl: "",
    categoria: "PYTHON",
    data_criacao: "2025-01-25T09:15:00.000Z", 
    data_modificacao: "2025-01-30T11:45:00.000Z",
    conteudo: `---

# 🐍 Python Data Analysis

Projeto de análise de dados utilizando Python com foco em visualizações e insights.

## 📊 Ferramentas

- Python 3.11
- Pandas
- Matplotlib/Seaborn
- Jupyter Notebooks

## 📈 Análises

✅ Limpeza de dados  
✅ Estatísticas descritivas  
✅ Visualizações interativas  
✅ Relatórios automatizados  

---`
  },
  {
    id: 10,
    titulo: "VUE ECOMMERCE",
    descricao: "E-commerce completo desenvolvido com Vue.js 3",
    imageurl: "",
    categoria: "VUE",
    data_criacao: "2024-12-20T13:30:00.000Z",
    data_modificacao: "2024-12-28T17:20:00.000Z", 
    conteudo: `---

# 🛒 Vue E-commerce

E-commerce completo desenvolvido com Vue.js 3 e Composition API.

## 🔧 Tecnologias

- Vue 3 + Composition API
- Pinia (State Management)
- Vue Router
- Tailwind CSS

## 🏪 Funcionalidades

✅ Catálogo de produtos  
✅ Carrinho de compras  
✅ Checkout completo  
✅ Painel administrativo  

---`
  },
  {
    id: 11,
    titulo: "ANGULAR CRM",
    descricao: "Sistema CRM empresarial com Angular e Material Design",
    imageurl: "",
    categoria: "ANGULAR",
    data_criacao: "2024-11-10T08:45:00.000Z",
    data_modificacao: "2024-11-18T14:15:00.000Z",
    conteudo: `---

# 🏢 Angular CRM

Sistema de CRM empresarial desenvolvido com Angular e Angular Material.

## ⚙️ Stack

- Angular 17
- Angular Material
- RxJS
- TypeScript

## 📋 Módulos

✅ Gestão de clientes  
✅ Pipeline de vendas  
✅ Relatórios e dashboards  
✅ Autenticação e permissões  

---`
  },
  {
    id: 12,
    titulo: "FLUTTER MOBILE APP",
    descricao: "Aplicativo mobile multiplataforma com Flutter",
    imageurl: "",
    categoria: "FLUTTER",
    data_criacao: "2024-10-05T16:00:00.000Z",
    data_modificacao: "2024-10-12T10:30:00.000Z",
    conteudo: `---

# 📱 Flutter Mobile App

Aplicativo mobile multiplataforma desenvolvido com Flutter.

## 📲 Plataformas

- Android
- iOS
- Web

## 🎯 Recursos

✅ Interface nativa  
✅ State management (Bloc)  
✅ Integração com APIs  
✅ Notificações push  

---`
  }
];

// Gerar categorias automaticamente dos projetos
export const generateStaticCategories = (): Category[] => {
  const categoryMap = new Map<string, ProjectCard[]>();
  
  staticProjects.forEach(project => {
    const categoryName = project.categoria?.trim();
    if (categoryName) {
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, []);
      }
      categoryMap.get(categoryName)?.push(project);
    }
  });
  
  const categories = Array.from(categoryMap.entries()).map(([name, projects]) => ({
    name,
    count: projects.length,
    projects: projects
  }));
  
  // Ordenar por quantidade de projetos (decrescente)
  categories.sort((a, b) => b.count - a.count);
  
  return categories;
};

export const staticCategories = generateStaticCategories();