# 🚚 Fleet Management System

![Fleet Management System](https://i.postimg.cc/TYxSGDzV/Gemini-Generated-Image-sss40sss40sss40s.png)

Sistema web completo para gerenciamento de frotas, desenvolvido para controlar veículos, motoristas, contratos, manutenções e operações relacionadas à gestão de uma frota.

🔗 **Demo online:**  
https://nataliapastre-dev.github.io/fleet-management-system/

---

## 📌 Sobre o Projeto

O **Fleet Management System** foi desenvolvido como projeto Full Stack com o objetivo de criar uma solução para controle e organização de frotas.

A aplicação permite centralizar informações de veículos, acompanhar manutenções, controlar motoristas e contratos, além de disponibilizar um dashboard com indicadores da operação.

---

## 🚀 Funcionalidades

### 📊 Dashboard
- Visão geral da frota
- Total de veículos cadastrados
- Status dos veículos
- Ordens de serviço abertas
- Custos de manutenção
- Gráficos e indicadores

### 🚗 Gestão de Veículos
- Cadastro de veículos
- Edição de informações
- Controle de:
  - Marca
  - Modelo
  - Placa
  - Ano
  - Chassi
  - RENAVAM
  - Quilometragem
  - Combustível
  - Status

### 👨‍✈️ Gestão de Motoristas
- Cadastro de motoristas
- Associação de motoristas aos veículos
- Controle de informações dos condutores

### 📄 Ordens de Serviço
- Cadastro de serviços
- Controle de manutenção
- Registro de custos
- Impressão de ordem de serviço em PDF

### 🔧 Manutenções
- Histórico de manutenções
- Tipos de serviços realizados
- Controle de peças
- Controle de mão de obra
- Cálculo de custos

### 📑 Contratos
- Cadastro e gerenciamento de contratos
- Controle de informações contratuais

---

# 🛠️ Tecnologias Utilizadas

## Front-end

- React
- Vite
- JavaScript
- HTML5
- CSS3
- React Router
- Axios
- Recharts
- React Icons

## Back-end

- Node.js
- Fastify
- SQLite
- JWT Authentication
- PDFKit

## Ferramentas

- Git
- GitHub
- VS Code
- Insomnia

---

# 📂 Estrutura do Projeto

```
fleet-management-system
│
├── frontend
│   ├── src
│   ├── pages
│   ├── components
│   └── services
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── database
│   └── server.js
│
└── README.md
```

---

# ⚙️ Como Executar Localmente

## Pré-requisitos

- Node.js instalado
- npm instalado

---

## Backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

O servidor será iniciado em:

```
http://localhost:3333
```

---

## Frontend

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

Aplicação disponível em:

```
http://localhost:5173
```

---

# 🔐 Autenticação

O sistema possui autenticação utilizando:

- JWT
- Controle de acesso através de token
- Rotas protegidas

---

# 📈 Próximas Melhorias

- [ ] Publicação do backend em ambiente cloud
- [ ] Integração com banco de dados em produção
- [ ] Relatórios avançados
- [ ] Exportação de dados
- [ ] Controle de abastecimentos
- [ ] Controle de pneus
- [ ] Controle de multas
- [ ] Sistema de notificações

---

# 👩‍💻 Desenvolvido por

**Natália Baptista Pastre**

🎓 Análise e Desenvolvimento de Sistemas

💻 Desenvolvedora Front-end | Full Stack em formação

GitHub:
https://github.com/nataliapastre-dev

---

⭐ Se este projeto foi útil, deixe uma estrela no repositório!
