import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";


function EditUser() {


  const { id } = useParams();

  const navigate = useNavigate();



  const [form, setForm] = useState({

    name: "",
    email: "",
    role: "Operador",
    status: "Ativo"

  });





  useEffect(() => {

    loadUser();

  }, []);






  async function loadUser() {

    try {

      const response = await api.get("/users");


      const user = response.data.find(
        (item) => item.id === Number(id)
      );


      if (user) {

        setForm({

          name: user.name,

          email: user.email,

          role: user.role,

          status: user.status

        });

      }


    } catch (error) {

      console.error(
        "Erro ao carregar usuário:",
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


      await api.put(
        `/users/${id}`,
        form
      );



      alert(
        "Usuário atualizado com sucesso!"
      );



      navigate("/users");



    } catch (error) {


      console.error(error);


      alert(
        error.response?.data?.message ||
        "Erro ao atualizar usuário."
      );


    }


  }






  return (

    <div className="page-container">


      <div className="page-header">

        <h1>
          Editar Usuário
        </h1>

      </div>





      <form
        className="form-container"
        onSubmit={handleSubmit}
      >



        <div className="form-group">

          <label>
            Nome
          </label>


          <input

            type="text"

            name="name"

            value={form.name}

            onChange={handleChange}

            required

          />

        </div>






        <div className="form-group">

          <label>
            E-mail
          </label>


          <input

            type="email"

            name="email"

            value={form.email}

            onChange={handleChange}

            required

          />

        </div>






        <div className="form-group">

          <label>
            Perfil
          </label>


          <select

            name="role"

            value={form.role}

            onChange={handleChange}

          >

            <option value="Administrador">
              Administrador
            </option>


            <option value="Operador">
              Operador
            </option>


          </select>


        </div>






        <div className="form-group">

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


            <option value="Inativo">
              Inativo
            </option>


          </select>


        </div>






        <div className="form-actions">


          <button

            type="button"

            className="btn-secondary"

            onClick={() => navigate("/users")}

          >

            Cancelar

          </button>





          <button

            type="submit"

            className="btn-primary"

          >

            Atualizar Usuário

          </button>



        </div>




      </form>


    </div>

  );


}


export default EditUser;