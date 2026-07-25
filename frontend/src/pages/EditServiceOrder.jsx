import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";


function EditServiceOrder() {


  const { id } = useParams();

  const navigate = useNavigate();


  const [vehicles, setVehicles] = useState([]);



  const [form, setForm] = useState({

    vehicle_id:"",
    service_date:"",
    km_vehicle:"",
    description:"",
    service_type:"Preventiva",
    mechanic:"",
    status:"Aberta",
    cost:""

  });








  useEffect(() => {


    loadData();


  }, []);









  async function loadData() {


    try {


      const [

        orderResponse,

        vehiclesResponse


      ] = await Promise.all([


        api.get(`/service-orders/${id}`),


        api.get("/vehicles")


      ]);




      const order = orderResponse.data;



      setForm({


        vehicle_id: order.vehicle_id || "",

        service_date: order.service_date || "",

        km_vehicle: order.km_vehicle || "",

        description: order.description || "",

        service_type: order.service_type || "Preventiva",

        mechanic: order.mechanic || "",

        status: order.status || "Aberta",

        cost: order.cost || ""


      });



      setVehicles(

        vehiclesResponse.data || []

      );



    } catch(error) {


      console.error(

        "Erro ao carregar OS:",

        error

      );


    }


  }









  function handleChange(event) {


    const { name, value } = event.target;



    setForm({

      ...form,

      [name]:value

    });


  }









  async function handleSubmit(event) {


    event.preventDefault();




    try {


      await api.put(

        `/service-orders/${id}`,

        {


          vehicle_id:Number(form.vehicle_id),

          service_date:form.service_date,

          km_vehicle:Number(form.km_vehicle || 0),

          description:form.description,

          service_type:form.service_type,

          mechanic:form.mechanic,

          status:form.status,

          cost:Number(form.cost || 0)


        }

      );




      alert(

        "Ordem de serviço atualizada com sucesso!"

      );



      navigate("/service-orders");




    } catch(error) {


      console.error(

        "Erro ao atualizar OS:",

        error

      );



      alert(

        "Erro ao atualizar ordem de serviço."

      );


    }


  }









  return (


    <div className="page">



      <h1>

        Editar Ordem de Serviço

      </h1>






      <form onSubmit={handleSubmit}>





        <label>

          Veículo

        </label>


        <select

          name="vehicle_id"

          value={form.vehicle_id}

          onChange={handleChange}

          required

        >


          <option value="">

            Selecione o veículo

          </option>



          {

            vehicles.map(vehicle => (


              <option

                key={vehicle.id}

                value={vehicle.id}

              >


                {vehicle.brand}

                {" "}

                {vehicle.model}

                {" - "}

                {vehicle.plate}


              </option>


            ))

          }



        </select>









        <label>

          Data da OS

        </label>


        <input

          type="date"

          name="service_date"

          value={form.service_date}

          onChange={handleChange}

          required

        />









        <label>

          KM do veículo

        </label>


        <input

          type="number"

          name="km_vehicle"

          value={form.km_vehicle}

          onChange={handleChange}

        />









        <label>

          Tipo de Serviço

        </label>


        <select

          name="service_type"

          value={form.service_type}

          onChange={handleChange}

        >


          <option value="Preventiva">

            Preventiva

          </option>


          <option value="Corretiva">

            Corretiva

          </option>


        </select>









        <label>

          Descrição

        </label>


        <textarea

          name="description"

          value={form.description}

          onChange={handleChange}

          required

        />









        <label>

          Mecânico

        </label>


        <input

          type="text"

          name="mechanic"

          value={form.mechanic}

          onChange={handleChange}

        />









        <label>

          Custo

        </label>


        <input

          type="number"

          step="0.01"

          name="cost"

          value={form.cost}

          onChange={handleChange}

        />









        <label>

          Status

        </label>


        <select

          name="status"

          value={form.status}

          onChange={handleChange}

        >


          <option value="Aberta">

            Aberta

          </option>


          <option value="Em andamento">

            Em andamento

          </option>


          <option value="Concluída">

            Concluída

          </option>


        </select>









        <button

          type="submit"

        >

          Atualizar OS

        </button>





      </form>




    </div>


  );


}



export default EditServiceOrder;