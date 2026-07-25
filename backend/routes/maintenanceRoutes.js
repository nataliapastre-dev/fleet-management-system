import {

  getMaintenances,

  getMaintenanceById,

  createMaintenance,

  updateMaintenance,

  deleteMaintenance


} from "../controllers/maintenanceController.js";




// ==============================
// Rotas de Manutenção
// ==============================

export default async function maintenanceRoutes(app) {



  // Listar todas

  app.get(
    "/maintenance",
    getMaintenances
  );




  // Buscar por ID

  app.get(
    "/maintenance/:id",
    getMaintenanceById
  );




  // Criar

  app.post(
    "/maintenance",
    createMaintenance
  );




  // Atualizar

  app.put(
    "/maintenance/:id",
    updateMaintenance
  );




  // Excluir

  app.delete(
    "/maintenance/:id",
    deleteMaintenance
  );



}