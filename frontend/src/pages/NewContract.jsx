import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function NewContract() {


  const navigate = useNavigate();


  const [vehicles, setVehicles] = useState([]);



  const [form, setForm] = useState({

    vehicle_id: "",
    contract_number: "",
    supplier: "",
    start_date: "",
    end_date: "",
    monthly_value: "",
    status: "Ativo"

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


      await api.post("/contracts", {


        vehicle_id: Number(form.vehicle_id),

        contract_number: form.contract_number,

        supplier: form.supplier,

        start_date: form.start_date,

        end_date: form.end_date,

        monthly_value: Number(form.monthly_value),

        status: form.status


      });



      alert(
        "Contrato cadastrado com sucesso!"
      );


      navigate("/contracts");



    } catch(error) {


      console.error(
        "Erro ao cadastrar contrato:",
        error
      );


      alert(

        error.response?.data?.error ||

        "Erro ao cadastrar contrato."

      );


    }


  }






  return (


    <div className="page">


      <h1>Novo Contrato</h1>




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



          {vehicles.map((vehicle) => (


            <option

              key={vehicle.id}

              value={vehicle.id}

            >

              {vehicle.brand} {vehicle.model} - {vehicle.plate}

            </option>


          ))}


        </select>






        <label>
          Número do contrato
        </label>


        <input

          type="text"

          name="contract_number"

          value={form.contract_number}

          onChange={handleChange}

          placeholder="CTR-001"

          required

        />







        <label>
          Fornecedor
        </label>


        <input

          type="text"

          name="supplier"

          value={form.supplier}

          onChange={handleChange}

          placeholder="Ex: Localiza"

          required

        />







        <label>
          Data início
        </label>


        <input

          type="date"

          name="start_date"

          value={form.start_date}

          onChange={handleChange}

          required

        />







        <label>
          Data fim
        </label>


        <input

          type="date"

          name="end_date"

          value={form.end_date}

          onChange={handleChange}

          required

        />







        <label>
          Valor mensal
        </label>


        <input

          type="number"

          name="monthly_value"

          value={form.monthly_value}

          onChange={handleChange}

          placeholder="2500"

          min="0"

          required

        />







        <label>
          Status
        </label>


        <select

          name="status"

          value={form.status}

          onChange={handleChange}

        >


          <option value="Ativo">

            Ativo

          </option>



          <option value="Pendente">

            Pendente

          </option>



          <option value="Encerrado">

            Encerrado

          </option>


        </select>







        <button

          type="submit"

          className="btn-primary"

        >

          Salvar Contrato

        </button>



      </form>



    </div>


  );


}


export default NewContract;