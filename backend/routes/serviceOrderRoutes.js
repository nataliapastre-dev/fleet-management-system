import {

  createServiceOrder,

  getServiceOrders,

  getServiceOrderById,

  updateServiceOrder,

  deleteServiceOrder,

  printServiceOrder


} from "../controllers/serviceOrderController.js";





// ==============================
// ROTAS ORDENS DE SERVIÇO
// ==============================


export default async function serviceOrderRoutes(app) {




  // ==============================
  // Criar OS
  // POST /service-orders
  // ==============================

  app.post(

    "/service-orders",

    createServiceOrder

  );







  // ==============================
  // Listar todas OS
  // GET /service-orders
  // ==============================

  app.get(

    "/service-orders",

    getServiceOrders

  );







  // ==============================
  // Buscar OS por ID
  // GET /service-orders/:id
  // ==============================

  app.get(

    "/service-orders/:id",

    getServiceOrderById

  );







  // ==============================
  // Atualizar OS
  // PUT /service-orders/:id
  // ==============================

  app.put(

    "/service-orders/:id",

    updateServiceOrder

  );







  // ==============================
  // Excluir OS
  // DELETE /service-orders/:id
  // ==============================

  app.delete(

    "/service-orders/:id",

    deleteServiceOrder

  );







  // ==============================
  // Gerar PDF
  // GET /service-orders/:id/pdf
  // ==============================

  app.get(

    "/service-orders/:id/pdf",

    printServiceOrder

  );



}