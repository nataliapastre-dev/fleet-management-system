import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Maintenance() {


  const [maintenances, setMaintenances] = useState([]);

  const navigate = useNavigate();




  useEffect(() => {

    loadMaintenances();

  }, []);






  async function loadMaintenances() {


    try {


      const response = await api.get("/maintenance");


      setMaintenances(

        response.data || []

      );



    } catch(error) {


      console.error(

        "Erro ao carregar manutenções:",

        error

      );


    }


  }








  async function deleteMaintenance(id) {


    const confirmDelete = window.confirm(

      "Deseja excluir esta manutenção?"

    );



    if(!confirmDelete) return;





    try {


      await api.delete(

        `/maintenance/${id}`

      );



      loadMaintenances();



    } catch(error) {


      console.error(

        "Erro ao excluir manutenção:",

        error

      );


    }


  }








  function formatCurrency(value) {


    return Number(value || 0)

      .toLocaleString(

        "pt-BR",

        {

          style:"currency",

          currency:"BRL"

        }

      );


  }








  function formatDate(date) {


    if(!date) return "-";



    return new Date(date)

      .toLocaleDateString(

        "pt-BR"

      );


  }








  return (


    <div className="page">





      <div className="page-header">


        <h1>

          Manutenções

        </h1>





        <button

          className="btn-primary"

          onClick={() =>

            navigate("/new-maintenance")

          }

        >

          + Nova Manutenção

        </button>



      </div>









      <div className="table-container">



        <table className="data-table">



          <thead>


            <tr>


              <th>Veículo</th>

              <th>Tipo</th>

              <th>Descrição</th>

              <th>Oficina</th>

              <th>Data</th>

              <th>KM</th>

              <th>Peças</th>

              <th>Mão de obra</th>

              <th>Total</th>

              <th>Status</th>

              <th>Ações</th>


            </tr>


          </thead>






          <tbody>



            {maintenances.length === 0 && (


              <tr>


                <td colSpan="11">

                  Nenhuma manutenção cadastrada.

                </td>


              </tr>


            )}






            {maintenances.map((maintenance)=>(



              <tr key={maintenance.id}>


                <td>


                  <strong>

                    {maintenance.brand || ""}

                    {" "}

                    {maintenance.model || ""}

                  </strong>


                  <br />


                  {maintenance.plate || "-"}



                </td>






                <td>

                  {maintenance.maintenance_type || "-"}

                </td>






                <td>

                  {maintenance.description || "-"}

                </td>






                <td>


                  <strong>

                    {maintenance.workshop || "-"}

                  </strong>


                  <br />

                  Mecânico:

                  {" "}

                  {maintenance.mechanic || "-"}


                  <br />

                  {maintenance.workshop_city || ""}


                  <br />

                  {maintenance.workshop_phone || ""}


                  <br />

                  {maintenance.workshop_email || ""}



                </td>






                <td>

                  {formatDate(

                    maintenance.maintenance_date

                  )}

                </td>






                <td>

                  {maintenance.km_vehicle || 0}

                  {" km"}

                </td>






                <td>

                  {formatCurrency(

                    maintenance.parts_cost

                  )}

                </td>






                <td>

                  {formatCurrency(

                    maintenance.labor_cost

                  )}

                </td>






                <td>


                  <strong>

                    {formatCurrency(

                      maintenance.total_cost

                    )}

                  </strong>


                </td>






                <td>


                  <span className="status-active">


                    {maintenance.status || "Aberta"}


                  </span>


                </td>






                <td>



                  <button

                    className="btn-edit"

                    onClick={() =>

                      navigate(

                        `/edit-maintenance/${maintenance.id}`

                      )

                    }

                  >

                    Editar

                  </button>






                  <button

                    className="btn-delete"

                    onClick={() =>

                      deleteMaintenance(

                        maintenance.id

                      )

                    }

                  >

                    Excluir

                  </button>



                </td>




              </tr>



            ))}



          </tbody>



        </table>



      </div>




    </div>


  );


}



export default Maintenance;