import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function NewUser() {


  const navigate = useNavigate();



  const [form, setForm] = useState({

    name: "",
    email: "",
    password: "",
    role: "Operador",
    status: "Ativo"

  });





  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  }





  async function handleSubmit(e) {

    e.preventDefault();


    try {


      await api.post(
        "/users",
        form
      );


      alert(
        "Usuário criado com sucesso!"
      );


      navigate("/users");



    } catch (error) {


      console.error(
        error
      );


      alert(
        error.response?.data?.message ||
        "Erro ao criar usuário."
      );


    }


  }





  return (

    <div className="page-container">


      <div className="page-header">

        <h1>
          Novo Usuário
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

            placeholder="Digite o nome"

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

            placeholder="Digite o e-mail"

            required

          />

        </div>





        <div className="form-group">

          <label>
            Senha
          </label>


          <input

            type="password"

            name="password"

            value={form.password}

            onChange={handleChange}

            placeholder="Digite a senha"

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

            Salvar Usuário

          </button>



        </div>




      </form>


    </div>

  );


}


export default NewUser;