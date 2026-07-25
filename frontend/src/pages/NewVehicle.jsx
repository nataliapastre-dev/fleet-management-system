import { useEffect, useState } from "react";
import api from "../services/api";

function NewVehicle() {

  const initialState = {

    plate: "",
    brand: "",
    model: "",
    year: "",

    chassis: "",
    renavam: "",
    color: "",

    fuel: "",
    transmission: "",
    mileage: "",
    category: "",

    purchase_date: "",
    purchase_value: "",

    document_expiration: "",
    next_revision: "",
    next_oil_change: "",
    insurance_expiration: "",

    status: "Disponível",

    notes: "",

    driver_id: ""

  };


  const [vehicle, setVehicle] = useState(initialState);

  const [drivers, setDrivers] = useState([]);



  useEffect(() => {

    loadDrivers();

  }, []);



  async function loadDrivers() {

    try {

      const response = await api.get("/drivers");

      setDrivers(response.data);


    } catch(error) {

      console.error(
        "Erro ao buscar motoristas:",
        error
      );

    }

  }



  function handleChange(event) {

    setVehicle({

      ...vehicle,

      [event.target.name]:
      event.target.value

    });

  }




  async function handleSubmit(event) {

    event.preventDefault();


    try {


      await api.post(
        "/vehicles",
        vehicle
      );


      alert(
        "Veículo cadastrado com sucesso!"
      );


      setVehicle(initialState);



    } catch(error) {


      console.error(
        "Erro ao cadastrar veículo:",
        error
      );


      alert(
        "Erro ao cadastrar veículo"
      );

    }

  }



  return (

    <div className="page">

      <h2>
        Novo Veículo
      </h2>



      <form onSubmit={handleSubmit}>


        <h3>
          Dados do Veículo
        </h3>


        <input
          name="plate"
          placeholder="Placa"
          value={vehicle.plate}
          onChange={handleChange}
        />


        <input
          name="brand"
          placeholder="Marca"
          value={vehicle.brand}
          onChange={handleChange}
        />


        <input
          name="model"
          placeholder="Modelo"
          value={vehicle.model}
          onChange={handleChange}
        />


        <input
          name="year"
          type="number"
          placeholder="Ano"
          value={vehicle.year}
          onChange={handleChange}
        />


        <input
          name="chassis"
          placeholder="Chassi"
          value={vehicle.chassis}
          onChange={handleChange}
        />


        <input
          name="renavam"
          placeholder="Renavam"
          value={vehicle.renavam}
          onChange={handleChange}
        />


        <input
          name="color"
          placeholder="Cor"
          value={vehicle.color}
          onChange={handleChange}
        />



        <h3>
          Motorista Responsável
        </h3>


        <select

          name="driver_id"

          value={vehicle.driver_id}

          onChange={handleChange}

        >

          <option value="">
            Sem motorista vinculado
          </option>


          {
            drivers.map(driver => (

              <option
                key={driver.id}
                value={driver.id}
              >

                {driver.name}

              </option>

            ))
          }


        </select>





        <h3>
          Características
        </h3>


        <input
          name="fuel"
          placeholder="Combustível"
          value={vehicle.fuel}
          onChange={handleChange}
        />


        <input
          name="transmission"
          placeholder="Câmbio"
          value={vehicle.transmission}
          onChange={handleChange}
        />


        <input
          name="category"
          placeholder="Categoria"
          value={vehicle.category}
          onChange={handleChange}
        />


        <input
          name="mileage"
          type="number"
          placeholder="Quilometragem"
          value={vehicle.mileage}
          onChange={handleChange}
        />



        <h3>
          Aquisição
        </h3>


        <input
          name="purchase_date"
          type="date"
          value={vehicle.purchase_date}
          onChange={handleChange}
        />


        <input
          name="purchase_value"
          type="number"
          step="0.01"
          placeholder="Valor de aquisição"
          value={vehicle.purchase_value}
          onChange={handleChange}
        />



        <h3>
          Controle e Manutenção
        </h3>


        <input
          name="document_expiration"
          type="date"
          value={vehicle.document_expiration}
          onChange={handleChange}
        />


        <input
          name="next_revision"
          type="date"
          value={vehicle.next_revision}
          onChange={handleChange}
        />


        <input
          name="next_oil_change"
          type="date"
          value={vehicle.next_oil_change}
          onChange={handleChange}
        />


        <input
          name="insurance_expiration"
          type="date"
          value={vehicle.insurance_expiration}
          onChange={handleChange}
        />



        <h3>
          Status
        </h3>


        <select
          name="status"
          value={vehicle.status}
          onChange={handleChange}
        >

          <option value="Disponível">
            Disponível
          </option>


          <option value="Manutenção">
            Manutenção
          </option>


          <option value="Indisponível">
            Indisponível
          </option>


        </select>



        <h3>
          Observações
        </h3>


        <textarea

          name="notes"

          placeholder="Observações"

          value={vehicle.notes}

          onChange={handleChange}

        />



        <button type="submit">

          Cadastrar

        </button>


      </form>


    </div>

  );

}


export default NewVehicle;