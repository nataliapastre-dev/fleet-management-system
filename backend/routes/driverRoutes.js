import {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver
} from "../controllers/driverController.js";

export default async function driverRoutes(app) {

  // Criar motorista
  app.post("/drivers", createDriver);

  // Listar todos os motoristas
  app.get("/drivers", getDrivers);

  // Buscar motorista por ID
  app.get("/drivers/:id", getDriverById);

  // Atualizar motorista
  app.put("/drivers/:id", updateDriver);

  // Excluir motorista
  app.delete("/drivers/:id", deleteDriver);

}