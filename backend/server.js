import "dotenv/config";

import Fastify from "fastify";
import cors from "@fastify/cors";

import "./database/database.js";


// ==============================
// CONFIGURAÇÃO DO SERVIDOR
// ==============================

const app = Fastify({
  logger: true,
});



// ==============================
// CORS
// ==============================

await app.register(cors, {

  origin: [

    "http://localhost:5173",

    "https://nataliapastre-dev.github.io",

  ],

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

    sistema: "Fleet Management System API",

    status: "online",

    versao: "2.0.0",

    ambiente: process.env.NODE_ENV || "development",


    modulos: [

      "Autenticação JWT",

      "Usuários",

      "Veículos",

      "Ordens de Serviço",

      "Motoristas",

      "Contratos",

      "Manutenções",

      "Dashboard",

    ],


  };

});





// ==============================
// ROTAS
// ==============================


await app.register(authRoutes, {

  prefix: "/auth",

});


await app.register(userRoutes, {

  prefix: "/users",

});


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

    erro: "Endpoint não encontrado.",

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
// INICIALIZAÇÃO
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

    console.log(`🌐 Porta: ${PORT}`);

    console.log("📦 Banco: SQLite");

    console.log("🔐 Autenticação: JWT + Bcrypt");

    console.log("👥 Usuários: OK");

    console.log("🚙 Veículos: OK");

    console.log("📄 Contratos: OK");

    console.log("👤 Motoristas: OK");

    console.log("🛠️ Manutenções: OK");

    console.log("📋 Ordens de Serviço: OK");

    console.log("📊 Dashboard: OK");

    console.log("=========================================");



  } catch(error) {


    app.log.error(error);

    process.exit(1);


  }

};



start();