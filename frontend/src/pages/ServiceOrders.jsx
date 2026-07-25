import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function ServiceOrders() {


  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();






  useEffect(() => {

    loadOrders();

  }, []);







  async function loadOrders() {


    try {


      const response = await api.get(
        "/service-orders"
      );


      setOrders(
        response.data || []
      );



    } catch(error) {


      console.error(
        "Erro ao carregar ordens de serviço:",
        error
      );


    }


  }









  async function deleteOrder(id) {


    const confirmDelete = window.confirm(

      "Deseja excluir esta ordem de serviço?"

    );



    if(!confirmDelete) return;







    try {


      await api.delete(

        `/service-orders/${id}`

      );



      loadOrders();




    } catch(error) {


      console.error(

        "Erro ao excluir OS:",

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









  function openPDF(id) {


    window.open(

      `http://localhost:3333/service-orders/${id}/pdf`,

      "_blank"

    );


  }









  return (


    <div className="page">







      <div className="page-header">



        <h1>

          Ordens de Serviço

        </h1>






        <button

          className="btn-primary"

          onClick={() =>

            navigate("/new-service-order")

          }

        >

          + Nova OS

        </button>



      </div>













      <div className="table-container">



        <table>



          <thead>


            <tr>


              <th>

                Veículo

              </th>



              <th>

                Tipo

              </th>



              <th>

                Descrição

              </th>



              <th>

                Data

              </th>



              <th>

                KM

              </th>



              <th>

                Mecânico

              </th>



              <th>

                Custo

              </th>



              <th>

                Status

              </th>



              <th>

                Ações

              </th>


            </tr>


          </thead>









          <tbody>





            {

              orders.length === 0 && (


                <tr>


                  <td colSpan="9">


                    Nenhuma ordem de serviço cadastrada.


                  </td>


                </tr>


              )

            }









            {


              orders.map(order => (



                <tr key={order.id}>





                  <td>



                    <strong>


                      {order.brand || ""}


                      {" "}


                      {order.model || ""}


                    </strong>



                    <br />



                    {order.plate || "-"}



                  </td>









                  <td>


                    {order.service_type || "-"}


                  </td>









                  <td>


                    {order.description || "-"}


                  </td>









                  <td>


                    {formatDate(

                      order.service_date

                    )}


                  </td>









                  <td>


                    {order.km_vehicle || 0}

                    {" km"}


                  </td>









                  <td>


                    {order.mechanic || "-"}


                  </td>









                  <td>


                    {formatCurrency(

                      order.cost

                    )}


                  </td>









                  <td>



                    <span className="status-active">


                      {order.status || "Aberta"}


                    </span>



                  </td>









                  <td>




                    <button

                      className="btn-edit"

                      onClick={() =>

                        navigate(

                          `/edit-service-order/${order.id}`

                        )

                      }


                    >

                      Editar

                    </button>








                    <button


                      className="btn-pdf"


                      onClick={() =>

                        openPDF(order.id)

                      }


                    >

                      PDF

                    </button>








                    <button


                      className="btn-delete"


                      onClick={() =>

                        deleteOrder(order.id)

                      }


                    >

                      Excluir

                    </button>





                  </td>






                </tr>



              ))


            }






          </tbody>




        </table>




      </div>





    </div>


  );


}



export default ServiceOrders;