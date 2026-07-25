# 🚚 Fleet Management System

<p align="center">
  <img src="https://i.postimg.cc/TYxSGDzV/Gemini-Generated-Image-sss40sss40sss40s.png" width="500"/>
</p>

<h3 align="center">
Sistema web completo para gerenciamento e controle de frotas
</h3>

<p align="center">
🔗 <a href="https://nataliapastre-dev.github.io/fleet-management-system/">Acessar aplicação online</a>
</p>

---

# 📌 Sobre o Projeto

O **Fleet Management System (FMS)** é uma aplicação web desenvolvida para gerenciamento de frotas corporativas, com foco em organização, controle operacional e visualização de informações estratégicas.

O projeto simula uma plataforma utilizada por empresas que precisam controlar seus veículos, motoristas, manutenções e processos relacionados à operação de uma frota.

A aplicação foi criada com arquitetura **Full Stack**, separando o front-end e back-end, permitindo uma estrutura escalável e organizada.

Todos os dados apresentados no sistema, incluindo:

- 🚗 veículos cadastrados;
- 👨‍✈️ motoristas cadastrados;
- 📄 contratos;
- 🔧 registros de manutenção;

são **dados fictícios criados exclusivamente para demonstração do funcionamento da aplicação**.

---

# 🎯 Objetivo do Projeto

O objetivo foi desenvolver uma solução semelhante aos sistemas utilizados no mercado para gestão de frotas, aplicando conceitos de:

- Desenvolvimento Front-end;
- Desenvolvimento Back-end;
- Consumo de APIs REST;
- Banco de dados;
- Autenticação;
- Dashboard com indicadores;
- Organização de processos empresariais.

---

# 🚀 Funcionalidades

## 📊 Dashboard

Painel principal com visão geral da operação:

- Quantidade total de veículos;
- Status da frota;
- Veículos disponíveis;
- Veículos em manutenção;
- Ordens de serviço abertas;
- Custos de manutenção;
- Gráficos e indicadores.

---

## 🚗 Gestão de Veículos

Módulo responsável pelo controle dos veículos da frota.

Funcionalidades:

- Cadastro de veículos;
- Edição de informações;
- Controle de status;
- Informações técnicas:

  - Marca;
  - Modelo;
  - Placa;
  - Ano;
  - Chassi;
  - RENAVAM;
  - Quilometragem;
  - Combustível;
  - Câmbio;
  - Categoria.

---

## 👨‍✈️ Gestão de Motoristas

Controle dos condutores vinculados à frota.

Funcionalidades:

- Cadastro de motoristas;
- Associação de motoristas aos veículos;
- Organização das informações dos condutores.

*(Todos os motoristas cadastrados são fictícios.)*

---

## 📄 Ordens de Serviço

Módulo para controle das solicitações de manutenção.

Possui:

- Cadastro de serviços;
- Tipo de manutenção;
- Peças utilizadas;
- Valor de mão de obra;
- Controle de custos;
- Geração de PDF.

---

## 🔧 Controle de Manutenções

Permite acompanhar o histórico de serviços realizados.

Funcionalidades:

- Registro de manutenções;
- Histórico por veículo;
- Controle financeiro;
- Acompanhamento operacional.

---

## 📑 Gestão de Contratos

Controle de contratos relacionados à frota.

Funcionalidades:

- Cadastro;
- Edição;
- Organização das informações contratuais.

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

# 🏗️ Arquitetura do Projeto

```
fleet-management-system
│
├── frontend
│   ├── React
│   ├── Pages
│   ├── Components
│   └── Services
│
├── backend
│   ├── Routes
│   ├── Controllers
│   ├── Database
│   └── Server
│
└── README.md
```

---

# ⚙️ Como Executar Localmente

## Backend

```bash
cd backend

npm install

npm run dev
```

Servidor:

```
http://localhost:3333
```

---

## Front-end

```bash
cd frontend

npm install

npm run dev
```

Aplicação:

```
http://localhost:5173
```

---

# 🔐 Autenticação

O sistema possui autenticação utilizando:

- JWT;
- Tokens de acesso;
- Controle de rotas protegidas.

---

# 📈 Melhorias Futuras

- [ ] Publicação do backend em ambiente cloud;
- [ ] Banco de dados em produção;
- [ ] Controle de abastecimentos;
- [ ] Controle de pneus;
- [ ] Controle de multas;
- [ ] Relatórios avançados;
- [ ] Sistema de alertas;
- [ ] Exportação de dados.

---

# 👩‍💻 Desenvolvido por

## Natália Baptista Pastre

🎓 Análise e Desenvolvimento de Sistemas

💻 Desenvolvedora Front-end | Full Stack em formação

GitHub:
https://github.com/nataliapastre-dev

---

⭐ Projeto desenvolvido para estudos, portfólio e demonstração de habilidades em desenvolvimento de aplicações web.
