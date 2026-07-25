import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";


function EditContract() {


  const { id } = useParams();

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

    loadContract();

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







  async function loadContract() {


    try {


      const response = await api.get(`/contracts/${id}`);


      setForm({

        vehicle_id: response.data.vehicle_id,

        contract_number: response.data.contract_number,

        supplier: response.data.supplier,

        start_date: response.data.start_date,

        end_date: response.data.end_date,

        monthly_value: response.data.monthly_value,

        status: response.data.status

      });



    } catch(error) {


      console.error(
        "Erro ao carregar contrato:",
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



      await api.put(`/contracts/${id}`, {


        vehicle_id: Number(form.vehicle_id),

        contract_number: form.contract_number,

        supplier: form.supplier,

        start_date: form.start_date,

        end_date: form.end_date,

        monthly_value: Number(form.monthly_value),

        status: form.status


      });





      alert(
        "Contrato atualizado com sucesso!"
      );



      navigate("/contracts");




    } catch(error) {



      console.error(
        "Erro ao atualizar contrato:",
        error
      );



      alert(

        error.response?.data?.error ||

        "Erro ao atualizar contrato."

      );



    }


  }








  return (



    <div className="page">



      <h1>Editar Contrato</h1>





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

          Atualizar Contrato

        </button>





      </form>




    </div>



  );


}



export default EditContract;