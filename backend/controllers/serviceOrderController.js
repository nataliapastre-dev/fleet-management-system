import db from "../database/database.js";
import PDFDocument from "pdfkit";



// ==============================
// Criar Ordem de Serviço
// ==============================

export function createServiceOrder(request, reply) {


  const {

    vehicle_id,
    service_date,
    km_vehicle,
    description,
    service_type,
    maintenance_type,
    mechanic,
    status,
    parts_cost,
    labor_cost

  } = request.body;



  try {


    const totalCost =

      Number(parts_cost || 0) +

      Number(labor_cost || 0);




    const result = db.prepare(`

      INSERT INTO service_orders (

        vehicle_id,

        service_date,

        km_vehicle,

        description,

        service_type,

        maintenance_type,

        mechanic,

        status,

        cost,

        parts_cost,

        labor_cost

      )


      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)


    `).run(


      Number(vehicle_id),

      service_date,

      Number(km_vehicle || 0),

      description,

      service_type || "Preventiva",

      maintenance_type || "Corretiva",

      mechanic || "",

      status || "Aberta",

      totalCost,

      Number(parts_cost || 0),

      Number(labor_cost || 0)


    );




    return reply.status(201).send({

      id: result.lastInsertRowid,

      message:
      "Ordem de serviço criada com sucesso!"

    });



  } catch(error) {


    console.log(error);


    return reply.status(500).send({

      error:
      "Erro ao criar ordem de serviço."

    });


  }


}









// ==============================
// Listar todas as OS
// ==============================

export function getServiceOrders(request, reply) {


  try {


    const orders = db.prepare(`


      SELECT


        so.*,


        v.brand,

        v.model,

        v.plate



      FROM service_orders so



      INNER JOIN vehicles v


      ON v.id = so.vehicle_id



      ORDER BY so.id DESC



    `).all();




    return reply.send(orders);



  } catch(error) {


    console.log(error);


    return reply.status(500).send({

      error:
      "Erro ao listar ordens de serviço."

    });


  }


}









// ==============================
// Buscar OS por ID
// ==============================

export function getServiceOrderById(request, reply) {


  const { id } = request.params;



  try {


    const order = db.prepare(`


      SELECT


        so.*,


        v.brand,

        v.model,

        v.plate,

        v.year



      FROM service_orders so



      INNER JOIN vehicles v


      ON v.id = so.vehicle_id



      WHERE so.id = ?



    `).get(id);





    if(!order){


      return reply.status(404).send({

        error:
        "Ordem de serviço não encontrada."

      });


    }





    return reply.send(order);



  } catch(error) {


    console.log(error);


    return reply.status(500).send({

      error:
      "Erro ao buscar ordem de serviço."

    });


  }


}









// ==============================
// Atualizar OS
// ==============================

export function updateServiceOrder(request, reply) {


  const { id } = request.params;



  const {

    vehicle_id,
    service_date,
    km_vehicle,
    description,
    service_type,
    maintenance_type,
    mechanic,
    status,
    parts_cost,
    labor_cost

  } = request.body;





  try {



    const exists = db.prepare(`

      SELECT id

      FROM service_orders

      WHERE id = ?

    `).get(id);




    if(!exists){


      return reply.status(404).send({

        error:
        "Ordem de serviço não encontrada."

      });


    }





    const totalCost =

      Number(parts_cost || 0)

      +

      Number(labor_cost || 0);







    db.prepare(`


      UPDATE service_orders


      SET


        vehicle_id = ?,


        service_date = ?,


        km_vehicle = ?,


        description = ?,


        service_type = ?,


        maintenance_type = ?,


        mechanic = ?,


        status = ?,


        cost = ?,


        parts_cost = ?,


        labor_cost = ?,


        updated_at = CURRENT_TIMESTAMP



      WHERE id = ?



    `).run(



      Number(vehicle_id),

      service_date,

      Number(km_vehicle || 0),

      description,

      service_type || "Preventiva",

      maintenance_type || "Corretiva",

      mechanic || "",

      status || "Aberta",

      totalCost,

      Number(parts_cost || 0),

      Number(labor_cost || 0),

      id



    );






    return reply.send({

      message:

      "Ordem de serviço atualizada com sucesso!"

    });





  } catch(error) {


    console.log(error);


    return reply.status(500).send({

      error:
      "Erro ao atualizar ordem de serviço."

    });


  }


}









// ==============================
// Excluir OS
// ==============================

export function deleteServiceOrder(request, reply) {


  const { id } = request.params;



  try {


    const result = db.prepare(`


      DELETE FROM service_orders


      WHERE id = ?



    `).run(id);




    if(result.changes === 0){


      return reply.status(404).send({

        error:
        "Ordem de serviço não encontrada."

      });


    }





    return reply.send({

      message:

      "Ordem de serviço excluída com sucesso!"

    });



  } catch(error) {


    console.log(error);


    return reply.status(500).send({

      error:
      "Erro ao excluir ordem de serviço."

    });


  }


}









// ==============================
// Gerar PDF OS
// ==============================

export function printServiceOrder(request, reply) {


  const { id } = request.params;



  const order = db.prepare(`


    SELECT


      so.*,


      v.plate,

      v.brand,

      v.model,

      v.year



    FROM service_orders so



    INNER JOIN vehicles v


    ON v.id = so.vehicle_id



    WHERE so.id = ?



  `).get(id);





  if(!order){


    return reply.status(404).send({

      error:
      "Ordem de serviço não encontrada."

    });


  }






  const doc = new PDFDocument({

    size:"A4",

    margin:50

  });





  reply.header(

    "Content-Type",

    "application/pdf"

  );



  reply.header(

    "Content-Disposition",

    `attachment; filename=ordem-servico-${id}.pdf`

  );





  doc.pipe(reply.raw);





  doc.fontSize(22)

  .text(

    "FLEET MANAGEMENT SYSTEM",

    {

      align:"center"

    }

  );



  doc.moveDown();



  doc.fontSize(16)

  .text(

    "ORDEM DE SERVIÇO",

    {

      align:"center"

    }

  );



  doc.moveDown(2);




  doc.fontSize(12);



  doc.text(`Número: ${order.id}`);

  doc.text(`Data: ${order.service_date}`);

  doc.text(`Status: ${order.status}`);




  doc.moveDown();



  doc.text("VEÍCULO");

  doc.text(`Marca: ${order.brand}`);

  doc.text(`Modelo: ${order.model}`);

  doc.text(`Placa: ${order.plate}`);

  doc.text(`Ano: ${order.year}`);




  doc.moveDown();



  doc.text("SERVIÇO");

  doc.text(`Tipo: ${order.service_type}`);

  doc.text(`Descrição: ${order.description}`);

  doc.text(`Mecânico: ${order.mechanic || "-"}`);




  doc.moveDown();



  doc.text("VALORES");

  doc.text(
    `Peças: R$ ${Number(order.parts_cost || 0).toFixed(2)}`
  );

  doc.text(
    `Mão de obra: R$ ${Number(order.labor_cost || 0).toFixed(2)}`
  );

  doc.text(
    `Total: R$ ${Number(order.cost || 0).toFixed(2)}`
  );




  doc.moveDown(3);



  doc.text(

    "Documento gerado automaticamente pelo Fleet Management System",

    {

      align:"center"

    }

  );




  doc.end();


}