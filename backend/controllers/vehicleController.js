import db from "../database/database.js";


// ==============================
// Criar Veículo
// ==============================

export function createVehicle(request, reply) {

  const {

    plate,
    model,
    brand,
    year,
    status,

    chassis,
    color,
    renavam,
    fuel,
    transmission,
    mileage,
    category,
    purchase_date,
    purchase_value,
    document_expiration,
    next_revision,
    next_oil_change,
    insurance_expiration,
    notes,

    driver_id

  } = request.body;



  const result = db.prepare(`

    INSERT INTO vehicles (

      plate,
      model,
      brand,
      year,
      status,

      chassis,
      color,
      renavam,
      fuel,
      transmission,
      mileage,
      category,
      purchase_date,
      purchase_value,
      document_expiration,
      next_revision,
      next_oil_change,
      insurance_expiration,
      notes,

      driver_id

    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

  `).run(

    plate,
    model,
    brand,
    year,
    status || "Disponível",

    chassis,
    color,
    renavam,
    fuel,
    transmission,
    mileage,
    category,
    purchase_date,
    purchase_value,
    document_expiration,
    next_revision,
    next_oil_change,
    insurance_expiration,
    notes,

    driver_id || null

  );



  return reply.send({

    id: result.lastInsertRowid,

    message:
    "Veículo cadastrado!"

  });

}





// ==============================
// Listar veículos
// ==============================

export function getVehicles(request, reply) {


  const vehicles = db.prepare(`

    SELECT

      vehicles.*,

      drivers.name AS driver_name,

      drivers.cpf AS driver_cpf,

      drivers.cnh AS driver_cnh,

      drivers.category AS driver_category,

      drivers.phone AS driver_phone


    FROM vehicles


    LEFT JOIN drivers

    ON vehicles.driver_id = drivers.id


    ORDER BY vehicles.id DESC


  `).all();



  return reply.send(vehicles);

}





// ==============================
// Buscar veículo por ID
// ==============================

export function getVehicleById(request, reply) {


  const { id } = request.params;



  const vehicle = db.prepare(`

    SELECT

      vehicles.*,

      drivers.name AS driver_name,

      drivers.cpf AS driver_cpf,

      drivers.cnh AS driver_cnh,

      drivers.category AS driver_category


    FROM vehicles


    LEFT JOIN drivers

    ON vehicles.driver_id = drivers.id


    WHERE vehicles.id = ?


  `).get(id);



  if (!vehicle) {

    return reply.status(404).send({

      message:
      "Veículo não encontrado"

    });

  }



  return reply.send(vehicle);

}





// ==============================
// Atualizar veículo
// ==============================

export function updateVehicle(request, reply) {


  const { id } = request.params;



  const {

    plate,
    model,
    brand,
    year,
    status,

    chassis,
    color,
    renavam,
    fuel,
    transmission,
    mileage,
    category,
    purchase_date,
    purchase_value,
    document_expiration,
    next_revision,
    next_oil_change,
    insurance_expiration,
    notes,

    driver_id

  } = request.body;



  const result = db.prepare(`

    UPDATE vehicles

    SET

      plate = ?,
      model = ?,
      brand = ?,
      year = ?,
      status = ?,


      chassis = ?,
      color = ?,
      renavam = ?,
      fuel = ?,
      transmission = ?,
      mileage = ?,
      category = ?,
      purchase_date = ?,
      purchase_value = ?,
      document_expiration = ?,
      next_revision = ?,
      next_oil_change = ?,
      insurance_expiration = ?,
      notes = ?,


      driver_id = ?


    WHERE id = ?

  `).run(


    plate,
    model,
    brand,
    year,
    status,


    chassis,
    color,
    renavam,
    fuel,
    transmission,
    mileage,
    category,
    purchase_date,
    purchase_value,
    document_expiration,
    next_revision,
    next_oil_change,
    insurance_expiration,
    notes,


    driver_id || null,


    id

  );



  if (result.changes === 0) {

    return reply.status(404).send({

      message:
      "Veículo não encontrado"

    });

  }



  return reply.send({

    message:
    "Veículo atualizado!"

  });

}





// ==============================
// Excluir veículo
// ==============================

export function deleteVehicle(request, reply) {


  const { id } = request.params;



  const result = db.prepare(`

    DELETE FROM vehicles

    WHERE id = ?

  `).run(id);



  if (result.changes === 0) {

    return reply.status(404).send({

      message:
      "Veículo não encontrado"

    });

  }



  return reply.send({

    message:
    "Veículo excluído!"

  });

}