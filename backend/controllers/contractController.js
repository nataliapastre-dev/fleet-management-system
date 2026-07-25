import db from "../database/database.js";


// ==============================
// Listar todos os contratos
// ==============================

export async function getContracts(request, reply) {

  try {

    const contracts = db.prepare(`
      SELECT
        contracts.*,
        vehicles.plate,
        vehicles.model,
        vehicles.brand
      FROM contracts
      INNER JOIN vehicles
      ON contracts.vehicle_id = vehicles.id
      ORDER BY contracts.id DESC
    `).all();

    return reply.send(contracts);

  } catch (error) {

    console.error(error);

    return reply.status(500).send({
      error: error.message
    });

  }

}


// ==============================
// Buscar contrato por ID
// ==============================

export async function getContractById(request, reply) {

  const { id } = request.params;

  try {

    const contract = db.prepare(`
      SELECT *
      FROM contracts
      WHERE id = ?
    `).get(id);

    if (!contract) {

      return reply.status(404).send({
        error: "Contrato não encontrado."
      });

    }

    return reply.send(contract);

  } catch (error) {

    console.error(error);

    return reply.status(500).send({
      error: error.message
    });

  }

}


// ==============================
// Cadastrar contrato
// ==============================

export async function createContract(request, reply) {

  const {

    vehicle_id,
    contract_number,
    supplier,
    start_date,
    end_date,
    monthly_value,
    status

  } = request.body;

  try {

    const result = db.prepare(`
      INSERT INTO contracts
      (
        vehicle_id,
        contract_number,
        supplier,
        start_date,
        end_date,
        monthly_value,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(

      vehicle_id,
      contract_number,
      supplier,
      start_date,
      end_date,
      monthly_value,
      status || "Ativo"

    );

    return reply.status(201).send({
      message: "Contrato cadastrado com sucesso!",
      id: result.lastInsertRowid
    });

  } catch (error) {

    console.error(error);

    return reply.status(500).send({
      error: error.message
    });

  }

}


// ==============================
// Atualizar contrato
// ==============================

export async function updateContract(request, reply) {

  const { id } = request.params;

  const {

    vehicle_id,
    contract_number,
    supplier,
    start_date,
    end_date,
    monthly_value,
    status

  } = request.body;

  try {

    db.prepare(`
      UPDATE contracts
      SET
        vehicle_id = ?,
        contract_number = ?,
        supplier = ?,
        start_date = ?,
        end_date = ?,
        monthly_value = ?,
        status = ?
      WHERE id = ?
    `).run(

      vehicle_id,
      contract_number,
      supplier,
      start_date,
      end_date,
      monthly_value,
      status,
      id

    );

    return reply.send({
      message: "Contrato atualizado com sucesso!"
    });

  } catch (error) {

    console.error(error);

    return reply.status(500).send({
      error: error.message
    });

  }

}


// ==============================
// Excluir contrato
// ==============================

export async function deleteContract(request, reply) {

  const { id } = request.params;

  try {

    db.prepare(`
      DELETE FROM contracts
      WHERE id = ?
    `).run(id);

    return reply.send({
      message: "Contrato excluído com sucesso!"
    });

  } catch (error) {

    console.error(error);

    return reply.status(500).send({
      error: error.message
    });

  }

}