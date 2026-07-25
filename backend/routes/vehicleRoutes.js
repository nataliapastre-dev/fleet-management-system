import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
} from "../controllers/vehicleController.js";

export default async function vehicleRoutes(app) {

  // Criar veículo
  app.post("/vehicles", createVehicle);

  // Listar veículos
  app.get("/vehicles", getVehicles);

  // Buscar veículo por ID
  app.get("/vehicles/:id", getVehicleById);

  // Atualizar veículo
  app.put("/vehicles/:id", updateVehicle);

  // Excluir veículo
  app.delete("/vehicles/:id", deleteVehicle);

}