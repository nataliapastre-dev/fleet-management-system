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

# 🔐 Acesso para Demonstração

<p align="center">
  <img src="https://i.postimg.cc/QtQZ0md1/Gemini-Generated-Image-91bdoe91bdoe91bd.png" width="300"/>
</p>

Para testar a aplicação, utilize o usuário de demonstração:

```
Usuário: Administrador Demo

Email: admin@fleet.com

Senha: 123456
```

> Credenciais criadas exclusivamente para demonstração do funcionamento da aplicação.

---

# 📌 Sobre o Projeto

O **Fleet Management System (FMS)** é uma aplicação web desenvolvida para o controle de frotas corporativas, com foco em organização operacional e visualização de dados estratégicos. A aplicação utiliza uma arquitetura **Full Stack**, garantindo uma estrutura organizada, escalável e de fácil manutenção.

---

# 💡 Motivação e Aprendizado

Este projeto nasceu da união entre meus estudos em Análise e Desenvolvimento de Sistemas e a minha experiência profissional prévia nas áreas de **manutenção de frotas e administrativa**.

Ao atuar diretamente com a rotina operacional, identifiquei como a falta de processos automatizados pode gerar ineficiências. Desenvolvi este sistema para transformar essa vivência em uma solução tecnológica que otimiza o controle de veículos, motoristas e manutenções.

### 🧗 Desafios Enfrentados
* **Gestão de Estado:** Sincronizar dados entre front-end e back-end para garantir que o *dashboard* refletisse alterações em tempo real.
* **Segurança:** Implementação de autenticação via JWT e proteção de rotas para garantir que dados sensíveis sejam acessados apenas por usuários autorizados.
* **Integridade de Dados:** Modelagem do banco (SQLite) para manter o histórico preciso de manutenções e ordens de serviço.

### 🏆 Resultados e Habilidades Adquiridas
* **Visão Full Stack:** Domínio na comunicação entre cliente e servidor e consumo de APIs REST.
* **Regras de Negócio:** Capacidade de traduzir processos reais de gestão em funcionalidades de software funcionais.
* **Resolução de Problemas:** Execução de um fluxo completo, do banco de dados até a interface do usuário final, consolidando boas práticas de desenvolvimento.

---

# 🎯 Objetivo do Projeto

O objetivo foi desenvolver uma solução semelhante aos sistemas utilizados no mercado para gestão de frotas, aplicando conceitos de:

- Desenvolvimento Front-end;
- Desenvolvimento Back-end;
- Consumo de APIs REST;
- Banco de dados;
- Autenticação de usuários;
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

> Todos os motoristas cadastrados são fictícios.

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

## 👥 Gestão de Usuários

Controle de acesso ao sistema.

Funcionalidades:

- Cadastro de usuários;
- Login autenticado;
- Controle de sessão;
- Proteção de rotas através de autenticação JWT.

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
- Bcrypt
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
- Bcrypt para proteção de senhas;
- Tokens de acesso;
- Rotas protegidas;
- Controle de usuários.

---

# 📈 Melhorias Futuras

- [ ] Publicação do back-end em ambiente cloud;
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


