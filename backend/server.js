import "dotenv/config";

import Fastify from "fastify";
import cors from "@fastify/cors";

import "./database/database.js";


// ==============================
// CONFIGURAÇÕES
// ==============================

const app = Fastify({
  logger: true,
});



// ==============================
// CORS
// ==============================

await app.register(cors, {

  origin: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

});




// ==============================
// IMPORTAÇÃO DAS ROTAS
// ==============================

import authRoutes from "./routes/authRoutes.js";

import userRoutes from "./routes/userRoutes.js";

import vehicleRoutes from "./routes/vehicleRoutes.js";
import serviceOrderRoutes from "./routes/serviceOrderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";




// ==============================
// ROTA PRINCIPAL
// ==============================

app.get("/", async () => {

  return {

    mensagem: "🚗 Fleet Management System API",

    status: "Servidor funcionando!",

    versao: "2.0.0",


    modulos: [

      "Autenticação (JWT)",

      "Usuários",

      "Veículos",

      "Ordens de Serviço",

      "Motoristas",

      "Contratos",

      "Manutenções",

      "Dashboard",

      "Relatórios",

    ],


    endpoints: {

      login: "/auth/login",

      register: "/auth/register",

      users: "/users",

      vehicles: "/vehicles",

      serviceOrders: "/service-orders",

      drivers: "/drivers",

      contracts: "/contracts",

      maintenances: "/maintenances",

      dashboard: "/dashboard",

    },

  };

});




// ==============================
// ROTAS DE AUTENTICAÇÃO
// ==============================

await app.register(authRoutes, {

  prefix: "/auth",

});




// ==============================
// ROTAS DE USUÁRIOS
// ==============================

await app.register(userRoutes, {

  prefix: "/users",

});




// ==============================
// ROTAS DO SISTEMA
// ==============================

await app.register(vehicleRoutes);

await app.register(serviceOrderRoutes);

await app.register(driverRoutes);

await app.register(contractRoutes);

await app.register(maintenanceRoutes);

await app.register(dashboardRoutes);





// ==============================
// ROTA NÃO ENCONTRADA
// ==============================

app.setNotFoundHandler(async (request, reply) => {

  return reply.status(404).send({

    erro: "Rota não encontrada.",

    metodo: request.method,

    rota: request.url,

  });

});





// ==============================
// TRATAMENTO DE ERROS
// ==============================

app.setErrorHandler(async (error, request, reply) => {

  app.log.error(error);


  return reply.status(error.statusCode || 500).send({

    erro: "Erro interno do servidor.",

    mensagem: error.message,

  });

});





// ==============================
// INICIALIZAÇÃO DO SERVIDOR
// ==============================

const start = async () => {

  try {

    const PORT = process.env.PORT || 3333;


    await app.listen({

      port: PORT,

      host: "0.0.0.0",

    });



    console.log("=========================================");

    console.log("🚗 Fleet Management System API");

    console.log("=========================================");

    console.log(`🌐 URL........: http://localhost:${PORT}`);

    console.log("📦 Banco......: SQLite");

    console.log("🔐 Login......: JWT + Bcrypt");

    console.log("👥 Usuários...: OK");

    console.log("🚙 Veículos...: OK");

    console.log("📄 Contratos..: OK");

    console.log("👤 Motoristas.: OK");

    console.log("🛠️ Manutenção.: OK");

    console.log("📋 O.S........: OK");

    console.log("📊 Dashboard..: OK");

    console.log("=========================================");


  } catch(error) {

    app.log.error(error);

    process.exit(1);

  }

};


start();