import db from "../database/database.js";



// ==============================
// Dashboard principal
// ==============================

export async function getDashboard(request, reply) {

  try {


    const totalVehicles = db
      .prepare(
        "SELECT COUNT(*) AS total FROM vehicles"
      )
      .get();



    const totalDrivers = db
      .prepare(
        "SELECT COUNT(*) AS total FROM drivers"
      )
      .get();




    const available = db
      .prepare(
        "SELECT COUNT(*) AS total FROM vehicles WHERE status = ?"
      )
      .get("Disponível");




    const vehicleMaintenance = db
      .prepare(
        "SELECT COUNT(*) AS total FROM vehicles WHERE status = ?"
      )
      .get("Manutenção");




    const unavailable = db
      .prepare(
        "SELECT COUNT(*) AS total FROM vehicles WHERE status = ?"
      )
      .get("Indisponível");





    const openOrders = db
      .prepare(
        "SELECT COUNT(*) AS total FROM service_orders WHERE status = ?"
      )
      .get("Aberta");






    // ==============================
    // Manutenções reais
    // ==============================


    const totalMaintenances = db.prepare(`

      SELECT COUNT(*) AS total

      FROM maintenance

    `).get();





    const maintenanceCost = db.prepare(`

      SELECT

      IFNULL(SUM(total_cost),0) AS total


      FROM maintenance


    `).get();







    const lastOrders = db.prepare(`


      SELECT


        so.id,

        so.service_date,

        so.description,

        so.service_type,

        so.mechanic,

        so.status,

        so.cost,


        v.model,

        v.brand,

        v.plate



      FROM service_orders so



      INNER JOIN vehicles v


        ON so.vehicle_id = v.id



      ORDER BY so.id DESC



      LIMIT 5



    `).all();







    const lastMaintenances = db.prepare(`


      SELECT


        m.id,

        m.maintenance_type,

        m.description,

        m.total_cost,

        m.status,

        m.maintenance_date,


        m.workshop,


        v.brand,

        v.model,

        v.plate



      FROM maintenance m



      INNER JOIN vehicles v


      ON m.vehicle_id = v.id



      ORDER BY m.id DESC



      LIMIT 5



    `).all();






    return reply.send({



      totalVehicles:
      totalVehicles.total,



      totalDrivers:
      totalDrivers.total,



      available:
      available.total,



      maintenance:
      vehicleMaintenance.total,



      unavailable:
      unavailable.total,



      openOrders:
      openOrders.total,



      totalMaintenances:
      totalMaintenances.total,



      maintenanceCost:
      Number(maintenanceCost.total),



      lastOrders,



      lastMaintenances



    });




  } catch(error) {


    console.error(error);



    return reply.status(500).send({

      message:
      "Erro ao carregar dashboard."

    });


  }

}








// ==============================
// Alertas da frota
// ==============================

export async function getDashboardAlerts(request, reply) {


  try {


    const today = new Date()
      .toISOString()
      .split("T")[0];



    const alerts = db.prepare(`


      SELECT


        id,

        brand,

        model,

        plate,

        status,

        next_revision,

        next_oil_change,

        document_expiration,

        insurance_expiration



      FROM vehicles



      WHERE


        status = 'Manutenção'


        OR status = 'Indisponível'


        OR next_revision <= date('now')


        OR next_oil_change <= date('now')


        OR document_expiration <= date('now')


        OR insurance_expiration <= date('now')



    `).all();






    const formattedAlerts = alerts.map(vehicle => {



      let message = "Verificar veículo";




      if(vehicle.status === "Manutenção") {


        message = "Veículo em manutenção";


      }


      else if(vehicle.status === "Indisponível") {


        message = "Veículo indisponível";


      }


      else if(
        vehicle.next_revision &&
        vehicle.next_revision <= today
      ) {


        message = "Revisão vencida";


      }


      else if(
        vehicle.next_oil_change &&
        vehicle.next_oil_change <= today
      ) {


        message = "Troca de óleo vencida";


      }


      else if(
        vehicle.document_expiration &&
        vehicle.document_expiration <= today
      ) {


        message = "Documento vencido";


      }


      else if(
        vehicle.insurance_expiration &&
        vehicle.insurance_expiration <= today
      ) {


        message = "Seguro vencido";


      }




      return {


        id: vehicle.id,


        vehicle:

        `${vehicle.brand} ${vehicle.model}`,


        plate: vehicle.plate,


        status: vehicle.status,


        message


      };


    });




    return reply.send(formattedAlerts);



  } catch(error) {


    console.error(error);



    return reply.status(500).send({

      message:
      "Erro ao carregar alertas."

    });


  }

}








// ==============================
// Custos de manutenção por mês
// ==============================

export async function getMaintenanceCosts(request, reply) {


  try {



    const costs = db.prepare(`


      SELECT


        strftime('%m', maintenance_date) AS month,


        IFNULL(SUM(total_cost),0) AS total



      FROM maintenance



      GROUP BY strftime('%m', maintenance_date)



      ORDER BY month



    `).all();






    const months = {


      "01":"Jan",
      "02":"Fev",
      "03":"Mar",
      "04":"Abr",
      "05":"Mai",
      "06":"Jun",
      "07":"Jul",
      "08":"Ago",
      "09":"Set",
      "10":"Out",
      "11":"Nov",
      "12":"Dez"


    };






    const formattedCosts = costs.map(item => ({


      month:

      months[item.month] || item.month,


      cost:

      Number(item.total)


    }));




    return reply.send(formattedCosts);




  } catch(error) {


    console.error(error);



    return reply.status(500).send({

      message:
      "Erro ao buscar custos de manutenção."

    });


  }

}








// ==============================
// Custos por veículo
// ==============================

export async function getMaintenanceCostsByVehicle(request, reply){


  try{


    const data = db.prepare(`


      SELECT


        v.brand || ' ' || v.model AS vehicle,


        SUM(m.total_cost) AS cost



      FROM maintenance m



      INNER JOIN vehicles v


      ON v.id = m.vehicle_id



      GROUP BY v.id



      ORDER BY cost DESC



    `).all();



    return reply.send(data);



  }catch(error){


    console.error(error);



    return reply.status(500).send({

      message:
      "Erro ao buscar custos por veículo."

    });


  }


}








// ==============================
// Tipos de manutenção
// ==============================

export async function getMaintenanceTypes(request, reply){


  try{


    const data = db.prepare(`


      SELECT


        maintenance_type AS name,


        COUNT(*) AS value



      FROM maintenance



      GROUP BY maintenance_type



    `).all();



    return reply.send(data);



  }catch(error){


    console.error(error);



    return reply.status(500).send({

      message:
      "Erro ao buscar tipos de manutenção."

    });


  }


}