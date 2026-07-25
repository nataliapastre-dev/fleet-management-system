import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  FaUserPlus,
  FaEdit,
  FaTrash
} from "react-icons/fa";


function Users() {

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();



  useEffect(() => {

    loadUsers();

  }, []);




  async function loadUsers() {

    try {

      const response = await api.get("/users");

      setUsers(response.data);


    } catch (error) {

      console.error(
        "Erro ao carregar usuários:",
        error
      );

    }

  }





  async function deleteUser(id) {


    const confirmDelete = window.confirm(
      "Deseja realmente excluir este usuário?"
    );


    if (!confirmDelete) return;



    try {

      await api.delete(`/users/${id}`);


      loadUsers();


    } catch (error) {

      console.error(
        "Erro ao excluir usuário:",
        error
      );

    }

  }





  return (

    <div className="page-container">


      <div className="page-header">


        <h1>
          Usuários
        </h1>


        <button
          className="btn-primary"
          onClick={() => navigate("/users/new")}
        >

          <FaUserPlus />

          Novo Usuário

        </button>


      </div>





      <div className="table-container">


        <table>


          <thead>

            <tr>

              <th>ID</th>

              <th>Nome</th>

              <th>E-mail</th>

              <th>Perfil</th>

              <th>Status</th>

              <th>Último Login</th>

              <th>Ações</th>

            </tr>

          </thead>




          <tbody>


            {
              users.map((user) => (

                <tr key={user.id}>


                  <td>
                    {user.id}
                  </td>


                  <td>
                    {user.name}
                  </td>


                  <td>
                    {user.email}
                  </td>


                  <td>
                    {user.role}
                  </td>


                  <td>

                    <span
                      className={
                        user.status === "Ativo"
                          ? "status-active"
                          : "status-inactive"
                      }
                    >

                      {user.status}

                    </span>

                  </td>


                  <td>

                    {
                      user.last_login
                        ? user.last_login
                        : "-"
                    }

                  </td>



                  <td>


                    <button
                      className="btn-edit"
                      onClick={() =>
                        navigate(
                          `/users/edit/${user.id}`
                        )
                      }
                    >

                      <FaEdit />

                    </button>



                    <button
                      className="btn-delete"
                      onClick={() =>
                        deleteUser(user.id)
                      }
                    >

                      <FaTrash />

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


export default Users;