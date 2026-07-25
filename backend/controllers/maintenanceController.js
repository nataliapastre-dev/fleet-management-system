import db from "../database/database.js";


// ==============================
// Listar todas as manutenções
// ==============================

export async function getMaintenances(request, reply) {

  try {

    const maintenances = db.prepare(`

      SELECT

        maintenance.*,

        vehicles.plate,
        vehicles.model,
        vehicles.brand

      FROM maintenance

      INNER JOIN vehicles

      ON maintenance.vehicle_id = vehicles.id

      ORDER BY maintenance.id DESC

    `).all();



    return reply.send(maintenances);



  } catch(error) {

    console.log(error);


    return reply.status(500).send({

      error: "Erro ao listar manutenções."

    });

  }

}






// ==============================
// Buscar manutenção por ID
// ==============================

export async function getMaintenanceById(request, reply) {


  const { id } = request.params;



  try {


    const maintenance = db.prepare(`

      SELECT

        maintenance.*,

        vehicles.plate,
        vehicles.model,
        vehicles.brand


      FROM maintenance


      INNER JOIN vehicles


      ON maintenance.vehicle_id = vehicles.id


      WHERE maintenance.id = ?


    `).get(id);



    if (!maintenance) {

      return reply.status(404).send({

        error: "Manutenção não encontrada."

      });

    }



    return reply.send(maintenance);



  } catch(error) {


    console.log(error);



    return reply.status(500).send({

      error: "Erro ao buscar manutenção."

    });


  }

}








// ==============================
// Criar manutenção
// ==============================

export async function createMaintenance(request, reply) {


  const {

    vehicle_id,

    service_order_id,

    maintenance_type,

    description,

    mechanic,

    workshop,

    workshop_city,

    workshop_phone,

    workshop_email,

    maintenance_date,

    km_vehicle,

    parts_cost,

    labor_cost,

    status


  } = request.body;



  try {


    if(!vehicle_id) {

      return reply.status(400).send({

        error: "Veículo obrigatório."

      });

    }



    const total_cost =

      Number(parts_cost || 0) +

      Number(labor_cost || 0);




    const result = db.prepare(`

      INSERT INTO maintenance

      (

        vehicle_id,

        service_order_id,

        maintenance_type,

        description,

        mechanic,

        workshop,

        workshop_city,

        workshop_phone,

        workshop_email,

        maintenance_date,

        km_vehicle,

        parts_cost,

        labor_cost,

        total_cost,

        status

      )


      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)


    `).run(


      Number(vehicle_id),

      service_order_id || null,

      maintenance_type || "",

      description || "",

      mechanic || "",

      workshop || "",

      workshop_city || "",

      workshop_phone || "",

      workshop_email || "",

      maintenance_date || null,

      Number(km_vehicle || 0),

      Number(parts_cost || 0),

      Number(labor_cost || 0),

      total_cost,

      status || "Aberta"


    );



    return reply.status(201).send({

      message:

      "Manutenção cadastrada com sucesso!",


      id:

      result.lastInsertRowid


    });



  } catch(error) {


    console.log(error);



    return reply.status(500).send({

      error: "Erro ao cadastrar manutenção."

    });


  }

}










// ==============================
// Atualizar manutenção
// ==============================

export async function updateMaintenance(request, reply) {


  const { id } = request.params;



  const {

    vehicle_id,

    service_order_id,

    maintenance_type,

    description,

    mechanic,

    workshop,

    workshop_city,

    workshop_phone,

    workshop_email,

    maintenance_date,

    km_vehicle,

    parts_cost,

    labor_cost,

    status


  } = request.body;



  try {


    const exists = db.prepare(`

      SELECT id

      FROM maintenance

      WHERE id = ?

    `).get(id);



    if(!exists) {

      return reply.status(404).send({

        error: "Manutenção não encontrada."

      });

    }




    const total_cost =

      Number(parts_cost || 0) +

      Number(labor_cost || 0);





    db.prepare(`

      UPDATE maintenance

      SET

        vehicle_id = ?,

        service_order_id = ?,

        maintenance_type = ?,

        description = ?,

        mechanic = ?,

        workshop = ?,

        workshop_city = ?,

        workshop_phone = ?,

        workshop_email = ?,

        maintenance_date = ?,

        km_vehicle = ?,

        parts_cost = ?,

        labor_cost = ?,

        total_cost = ?,

        status = ?


      WHERE id = ?


    `).run(


      Number(vehicle_id),

      service_order_id || null,

      maintenance_type || "",

      description || "",

      mechanic || "",

      workshop || "",

      workshop_city || "",

      workshop_phone || "",

      workshop_email || "",

      maintenance_date || null,

      Number(km_vehicle || 0),

      Number(parts_cost || 0),

      Number(labor_cost || 0),

      total_cost,

      status || "Aberta",

      id


    );




    return reply.send({

      message:

      "Manutenção atualizada com sucesso!"

    });



  } catch(error) {


    console.log(error);



    return reply.status(500).send({

      error: "Erro ao atualizar manutenção."

    });


  }

}









// ==============================
// Excluir manutenção
// ==============================

export async function deleteMaintenance(request, reply) {


  const { id } = request.params;



  try {


    const result = db.prepare(`

      DELETE FROM maintenance

      WHERE id = ?

    `).run(id);




    if(result.changes === 0) {


      return reply.status(404).send({

        error: "Manutenção não encontrada."

      });


    }




    return reply.send({

      message:

      "Manutenção excluída com sucesso!"

    });




  } catch(error) {


    console.log(error);



    return reply.status(500).send({

      error: "Erro ao excluir manutenção."

    });


  }

}