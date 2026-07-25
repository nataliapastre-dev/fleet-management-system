import db from "../database/database.js";


// ==============================
// Criar motorista
// ==============================
export async function createDriver(request, reply) {

  const {
    name,
    cpf,
    cnh,
    category,
    expiration_date,
    phone,
    email,
    status
  } = request.body;



  const result = db.prepare(`

    INSERT INTO drivers (

      name,
      cpf,
      cnh,
      category,
      expiration_date,
      phone,
      email,
      status

    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?)

  `).run(

    name,
    cpf,
    cnh,
    category,
    expiration_date,
    phone,
    email,
    status || "Ativo"

  );



  reply.code(201).send({

    message:
    "Motorista cadastrado com sucesso.",

    id:
    result.lastInsertRowid

  });

}




// ==============================
// Listar motoristas com veículos
// ==============================
export async function getDrivers(request, reply) {


  const drivers = db.prepare(`

    SELECT

      drivers.*,

      vehicles.id AS vehicle_id,

      vehicles.plate AS vehicle_plate,

      vehicles.brand AS vehicle_brand,

      vehicles.model AS vehicle_model,

      vehicles.brand || ' ' || vehicles.model AS vehicle_name,

      vehicles.status AS vehicle_status


    FROM drivers


    LEFT JOIN vehicles

    ON drivers.id = vehicles.driver_id


    ORDER BY drivers.name


  `).all();



  reply.send(drivers);

}






// ==============================
// Buscar motorista por ID
// ==============================
export async function getDriverById(request, reply) {


  const { id } = request.params;



  const driver = db.prepare(`

    SELECT

      drivers.*,

      vehicles.id AS vehicle_id,

      vehicles.plate AS vehicle_plate,

      vehicles.brand AS vehicle_brand,

      vehicles.model AS vehicle_model,

      vehicles.brand || ' ' || vehicles.model AS vehicle_name,

      vehicles.status AS vehicle_status


    FROM drivers


    LEFT JOIN vehicles

    ON drivers.id = vehicles.driver_id


    WHERE drivers.id = ?


  `).get(id);




  if (!driver) {

    return reply.code(404).send({

      message:
      "Motorista não encontrado."

    });

  }



  reply.send(driver);

}







// ==============================
// Atualizar motorista
// ==============================
export async function updateDriver(request, reply) {


  const { id } = request.params;



  const {
    name,
    cpf,
    cnh,
    category,
    expiration_date,
    phone,
    email,
    status

  } = request.body;





  const result = db.prepare(`

    UPDATE drivers

    SET

      name = ?,

      cpf = ?,

      cnh = ?,

      category = ?,

      expiration_date = ?,

      phone = ?,

      email = ?,

      status = ?


    WHERE id = ?

  `).run(


    name,

    cpf,

    cnh,

    category,

    expiration_date,

    phone,

    email,

    status,


    id

  );






  if (result.changes === 0) {


    return reply.code(404).send({

      message:
      "Motorista não encontrado."

    });


  }





  reply.send({

    message:
    "Motorista atualizado com sucesso."

  });

}







// ==============================
// Excluir motorista
// ==============================
export async function deleteDriver(request, reply) {


  const { id } = request.params;



  // Remove vínculo antes de excluir

  db.prepare(`

    UPDATE vehicles

    SET driver_id = NULL

    WHERE driver_id = ?

  `).run(id);




  const result = db.prepare(`

    DELETE FROM drivers

    WHERE id = ?

  `).run(id);





  if (result.changes === 0) {


    return reply.code(404).send({

      message:
      "Motorista não encontrado."

    });


  }





  reply.send({

    message:
    "Motorista excluído com sucesso."

  });

}