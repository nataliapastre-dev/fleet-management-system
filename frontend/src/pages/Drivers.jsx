import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Drivers() {

  const [drivers, setDrivers] = useState([]);

  const navigate = useNavigate();



  useEffect(() => {

    loadDrivers();

  }, []);




  async function loadDrivers() {

    try {

      const response = await api.get("/drivers");

      setDrivers(response.data);


    } catch (error) {

      console.error(
        "Erro ao buscar motoristas:",
        error
      );

    }

  }





  async function deleteDriver(id) {


    const confirmDelete = window.confirm(
      "Deseja realmente excluir este motorista?"
    );


    if (!confirmDelete) return;



    try {


      await api.delete(
        `/drivers/${id}`
      );


      alert(
        "Motorista excluído com sucesso!"
      );


      loadDrivers();



    } catch(error) {


      console.error(
        "Erro ao excluir motorista:",
        error
      );


      alert(
        "Erro ao excluir motorista"
      );

    }

  }







  return (

    <div className="page">


      <h2>
        Motoristas
      </h2>




      {
        drivers.length === 0 ? (

          <p>
            Nenhum motorista cadastrado.
          </p>


        ) : (


          drivers.map((driver) => (


            <div

              key={driver.id}

              className="vehicle-card"

            >


              <h3>
                {driver.name}
              </h3>



              <h4>
                Dados do Motorista
              </h4>



              <p>
                CPF: {driver.cpf}
              </p>



              <p>
                CNH: {driver.cnh}
              </p>



              <p>
                Categoria CNH: {driver.category}
              </p>



              <p>
                Validade CNH: {driver.expiration_date}
              </p>



              <p>
                Telefone: {driver.phone || "Não informado"}
              </p>



              <p>
                E-mail: {driver.email || "Não informado"}
              </p>



              <p>
                Status: {driver.status}
              </p>





              <h4>
                Veículo Vinculado
              </h4>




              {
                driver.vehicle_id ? (

                  <>

                    <p>
                      Veículo: {driver.vehicle_brand} {driver.vehicle_model}
                    </p>


                    <p>
                      Placa: {driver.vehicle_plate}
                    </p>


                    <p>
                      Status: {driver.vehicle_status}
                    </p>


                  </>


                ) : (

                  <p>
                    Nenhum veículo vinculado.
                  </p>

                )

              }






              <button

                onClick={() =>
                  navigate(
                    `/edit-driver/${driver.id}`
                  )
                }

              >

                Editar

              </button>






              <button

                onClick={() =>
                  deleteDriver(driver.id)
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



export default Drivers;