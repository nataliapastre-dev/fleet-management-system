import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Contracts() {

  const [contracts, setContracts] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {

    loadContracts();

  }, []);



  async function loadContracts() {

    try {

      const response = await api.get("/contracts");

      setContracts(response.data);

    } catch (error) {

      console.error(
        "Erro ao carregar contratos:",
        error
      );

    }

  }



  async function deleteContract(id) {

    const confirmDelete = window.confirm(
      "Deseja excluir este contrato?"
    );


    if (!confirmDelete) return;


    try {

      await api.delete(`/contracts/${id}`);

      loadContracts();


    } catch (error) {

      console.error(
        "Erro ao excluir contrato:",
        error
      );

    }

  }



  return (

    <div className="page">


      <h1>Contratos</h1>



      <button

        className="btn-primary"

        onClick={() => navigate("/new-contract")}

      >

        Novo Contrato

      </button>




      <div className="table-container">


        <table className="data-table">


          <thead>

            <tr>

              <th>Nº Contrato</th>

              <th>Veículo</th>

              <th>Fornecedor</th>

              <th>Início</th>

              <th>Fim</th>

              <th>Valor Mensal</th>

              <th>Status</th>

              <th>Ações</th>

            </tr>

          </thead>



          <tbody>


            {contracts.length === 0 ? (

              <tr>

                <td colSpan="8">

                  Nenhum contrato cadastrado.

                </td>

              </tr>


            ) : (


              contracts.map((contract) => (


                <tr key={contract.id}>


                  <td>

                    {contract.contract_number}

                  </td>



                  <td>

                    {contract.model}

                    <br />

                    <small>

                      {contract.plate}

                    </small>

                  </td>



                  <td>

                    {contract.supplier}

                  </td>



                  <td>

                    {contract.start_date}

                  </td>



                  <td>

                    {contract.end_date}

                  </td>



                  <td>

                    {Number(contract.monthly_value)

                      .toLocaleString("pt-BR", {

                        style: "currency",

                        currency: "BRL"

                      })

                    }

                  </td>



                  <td>

                    <span className="status-active">

                      {contract.status}

                    </span>

                  </td>



                  <td>


                    <button

                      className="btn-edit"

                      onClick={() =>
                        navigate(`/edit-contract/${contract.id}`)
                      }

                    >

                      Editar

                    </button>



                    <button

                      className="btn-delete"

                      onClick={() =>
                        deleteContract(contract.id)
                      }

                    >

                      Excluir

                    </button>


                  </td>



                </tr>


              ))

            )}


          </tbody>


        </table>


      </div>


    </div>

  );

}


export default Contracts;