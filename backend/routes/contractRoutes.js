import {
  getContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract
} from "../controllers/contractController.js";

export default async function contractRoutes(fastify) {

  // Listar todos os contratos
  fastify.get("/contracts", getContracts);

  // Buscar contrato por ID
  fastify.get("/contracts/:id", getContractById);

  // Cadastrar contrato
  fastify.post("/contracts", createContract);

  // Atualizar contrato
  fastify.put("/contracts/:id", updateContract);

  // Excluir contrato
  fastify.delete("/contracts/:id", deleteContract);

}