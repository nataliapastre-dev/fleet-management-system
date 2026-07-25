import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function NewMaintenance() {


  const navigate = useNavigate();


  const [vehicles, setVehicles] = useState([]);



  const [form, setForm] = useState({

    vehicle_id: "",

    service_order_id: "",

    maintenance_type: "Preventiva",

    description: "",

    mechanic: "",

    workshop: "",

    workshop_address: "",

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

  }, []);





  async function loadVehicles() {

    try {

      const response = await api.get("/vehicles");

      setVehicles(response.data);


    } catch(error) {

      console.error(
        "Erro ao carregar veículos:",
        error
      );

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


      await api.post("/maintenance", {


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


      });




      alert(
        "Manutenção cadastrada com sucesso!"
      );



      navigate("/maintenance");



    } catch(error) {


      console.error(
        "Erro ao cadastrar manutenção:",
        error
      );


      alert(
        error.response?.data?.error ||
        "Erro ao cadastrar manutenção."
      );


    }

  }







  return (

    <div className="page">


      <h1>Nova Manutenção</h1>




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

          value={form.description}

          onChange={handleChange}

          required

          placeholder="Descrição do serviço"

        />







        <label>
          Oficina
        </label>


        <input

          type="text"

          name="workshop"

          value={form.workshop}

          onChange={handleChange}

          placeholder="Nome da oficina"

        />






        <label>
          Endereço da oficina
        </label>


        <input

          type="text"

          name="workshop_address"

          value={form.workshop_address}

          onChange={handleChange}

          placeholder="Rua, número, bairro"

        />







        <label>
          Cidade da oficina
        </label>


        <input

          type="text"

          name="workshop_city"

          value={form.workshop_city}

          onChange={handleChange}

          placeholder="Ex: Araraquara"

        />







        <label>
          Telefone da oficina
        </label>


        <input

          type="text"

          name="workshop_phone"

          value={form.workshop_phone}

          onChange={handleChange}

          placeholder="(16) 99999-9999"

        />







        <label>
          Email da oficina
        </label>


        <input

          type="email"

          name="workshop_email"

          value={form.workshop_email}

          onChange={handleChange}

          placeholder="oficina@email.com"

        />







        <label>
          Data da manutenção
        </label>


        <input

          type="date"

          name="maintenance_date"

          value={form.maintenance_date}

          onChange={handleChange}

          required

        />







        <label>
          Quilometragem
        </label>


        <input

          type="number"

          name="km_vehicle"

          value={form.km_vehicle}

          onChange={handleChange}

        />







        <label>
          Custo de peças
        </label>


        <input

          type="number"

          name="parts_cost"

          value={form.parts_cost}

          onChange={handleChange}

        />







        <label>
          Custo mão de obra
        </label>


        <input

          type="number"

          name="labor_cost"

          value={form.labor_cost}

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






        <button type="submit">

          Salvar Manutenção

        </button>


      </form>


    </div>

  );

}


export default NewMaintenance;