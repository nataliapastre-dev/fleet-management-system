import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Vehicles() {

  const [vehicles, setVehicles] = useState([]);

  const navigate = useNavigate();



  useEffect(() => {

    loadVehicles();

  }, []);




  async function loadVehicles() {

    try {

      const response = await api.get("/vehicles");

      setVehicles(response.data);


    } catch (error) {

      console.error(
        "Erro ao buscar veículos:",
        error
      );

    }

  }





  async function deleteVehicle(id) {


    const confirmDelete = window.confirm(
      "Deseja realmente excluir este veículo?"
    );


    if (!confirmDelete) return;



    try {


      await api.delete(
        `/vehicles/${id}`
      );


      alert(
        "Veículo excluído com sucesso!"
      );


      loadVehicles();



    } catch (error) {


      console.error(
        "Erro ao excluir veículo:",
        error
      );


      alert(
        "Erro ao excluir veículo."
      );


    }


  }





  return (

    <div className="page">


      <h2>
        Veículos
      </h2>



      {
        vehicles.length === 0 ? (

          <p>
            Nenhum veículo cadastrado.
          </p>


        ) : (


          vehicles.map((vehicle) => (


            <div
              key={vehicle.id}
              className="vehicle-card"
            >


              <h3>

                {vehicle.brand}
                {" "}
                {vehicle.model}

              </h3>




              <h4>
                Dados do Veículo
              </h4>



              <p>
                Placa: {vehicle.plate}
              </p>



              <p>
                Ano: {vehicle.year}
              </p>



              <p>
                Chassi: {vehicle.chassis || "Não informado"}
              </p>



              <p>
                Cor: {vehicle.color || "Não informado"}
              </p>



              <p>
                Renavam: {vehicle.renavam || "Não informado"}
              </p>



              <p>
                Combustível: {vehicle.fuel || "Não informado"}
              </p>



              <p>
                Câmbio: {vehicle.transmission || "Não informado"}
              </p>



              <p>
                Quilometragem: {vehicle.mileage || 0} km
              </p>



              <p>
                Categoria: {vehicle.category || "Não informado"}
              </p>



              <p>
                Status: {vehicle.status}
              </p>




              <h4>
                Motorista Vinculado
              </h4>



              {
                vehicle.driver_name ? (

                  <>

                    <p>
                      Nome: {vehicle.driver_name}
                    </p>


                    <p>
                      CNH: {vehicle.driver_cnh}
                    </p>


                    <p>
                      Categoria CNH: {vehicle.driver_category}
                    </p>

                  </>


                ) : (

                  <p>
                    Nenhum motorista vinculado.
                  </p>

                )

              }





              <button
                onClick={() =>
                  navigate(
                    `/edit-vehicle/${vehicle.id}`
                  )
                }
              >
                Editar
              </button>





              <button
                onClick={() =>
                  deleteVehicle(vehicle.id)
                }
              >
                Excluir
              </button>




              <hr />


            </div>


          ))


        )


      }


    </div>

  );

}


export default Vehicles;