import {
  getDashboard,
  getDashboardAlerts,
  getMaintenanceCosts
} from "../controllers/dashboardController.js";



async function dashboardRoutes(fastify) {


  // ==============================
  // Dashboard principal
  // ==============================

  fastify.get(
    "/dashboard",
    getDashboard
  );



  // ==============================
  // Alertas da frota
  // ==============================

  fastify.get(
    "/dashboard/alerts",
    getDashboardAlerts
  );



  // ==============================
  // Custos de manutenção por mês
  // ==============================

  fastify.get(
    "/dashboard/maintenance-costs",
    getMaintenanceCosts
  );


}



export default dashboardRoutes;