import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";


function EditMaintenance() {


  const { id } = useParams();

  const navigate = useNavigate();


  const [vehicles, setVehicles] = useState([]);



  const [form, setForm] = useState({

    vehicle_id: "",

    service_order_id: "",

    maintenance_type: "Preventiva",

    description: "",

    mechanic: "",

    workshop: "",

    workshop_city: "",

    workshop_phone: "",

    workshop_email: "",

    maintenance_date: "",

    km_vehicle: "",

    parts_cost: "",

    labor_cost: "",

    status: "Aberta"

  });





  useEffect(() => {

    loadVehicles();

    loadMaintenance();

  }, []);





  async function loadVehicles() {

    try {

      const response = await api.get("/vehicles");

      setVehicles(response.data);


    } catch(error) {

      console.error(error);

    }

  }





  async function loadMaintenance() {

    try {

      const response = await api.get(
        `/maintenance/${id}`
      );


      setForm({

        ...response.data,

        service_order_id:
          response.data.service_order_id || ""

      });


    } catch(error) {

      console.error(error);

    }

  }






  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  }






  async function handleSubmit(e) {

    e.preventDefault();


    try {


      await api.put(

        `/maintenance/${id}`,

        {

          ...form,

          vehicle_id: Number(form.vehicle_id),

          service_order_id:
            form.service_order_id
              ? Number(form.service_order_id)
              : null,

          km_vehicle:
            Number(form.km_vehicle || 0),

          parts_cost:
            Number(form.parts_cost || 0),

          labor_cost:
            Number(form.labor_cost || 0)

        }

      );



      alert(
        "Manutenção atualizada com sucesso!"
      );


      navigate("/maintenance");


    } catch(error) {


      console.error(error);


      alert(
        error.response?.data?.error ||
        "Erro ao atualizar manutenção."
      );


    }

  }







  return (

    <div className="page">


      <h1>
        Editar Manutenção
      </h1>




      <form onSubmit={handleSubmit}>



        <label>
          Veículo
        </label>


        <select

          name="vehicle_id"

          value={form.vehicle_id || ""}

          onChange={handleChange}

          required

        >


          <option value="">
            Selecione o veículo
          </option>



          {vehicles.map(vehicle => (

            <option

              key={vehicle.id}

              value={vehicle.id}

            >

              {vehicle.brand} {vehicle.model} - {vehicle.plate}

            </option>

          ))}


        </select>





        <label>
          Tipo de manutenção
        </label>


        <select

          name="maintenance_type"

          value={form.maintenance_type}

          onChange={handleChange}

        >

          <option value="Preventiva">
            Preventiva
          </option>

          <option value="Corretiva">
            Corretiva
          </option>

          <option value="Revisão">
            Revisão
          </option>

        </select>






        <label>
          Descrição
        </label>


        <textarea

          name="description"

          value={form.description || ""}

          onChange={handleChange}

          required

        />







        <label>
          Oficina
        </label>


        <input

          name="workshop"

          value={form.workshop || ""}

          onChange={handleChange}

          placeholder="Nome da oficina"

        />





        <label>
          Cidade da oficina
        </label>


        <input

          name="workshop_city"

          value={form.workshop_city || ""}

          onChange={handleChange}

        />





        <label>
          Telefone da oficina
        </label>


        <input

          name="workshop_phone"

          value={form.workshop_phone || ""}

          onChange={handleChange}

        />





        <label>
          Email da oficina
        </label>


        <input

          type="email"

          name="workshop_email"

          value={form.workshop_email || ""}

          onChange={handleChange}

        />






        <label>
          Data
        </label>


        <input

          type="date"

          name="maintenance_date"

          value={form.maintenance_date || ""}

          onChange={handleChange}

          required

        />






        <label>
          KM
        </label>


        <input

          type="number"

          name="km_vehicle"

          value={form.km_vehicle || ""}

          onChange={handleChange}

        />






        <label>
          Custo peças
        </label>


        <input

          type="number"

          name="parts_cost"

          value={form.parts_cost || ""}

          onChange={handleChange}

        />






        <label>
          Mão de obra
        </label>


        <input

          type="number"

          name="labor_cost"

          value={form.labor_cost || ""}

          onChange={handleChange}

        />






        <label>
          Status
        </label>


        <select

          name="status"

          value={form.status || ""}

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






        <button type="submit">

          Atualizar Manutenção

        </button>




      </form>


    </div>

  );

}



export default EditMaintenance;