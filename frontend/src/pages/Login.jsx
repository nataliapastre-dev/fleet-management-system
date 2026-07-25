import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";



function Login() {


  const navigate = useNavigate();


  const [form, setForm] = useState({

    email: "",
    password: ""

  });


  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);




  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  }





  async function handleSubmit(e) {

    e.preventDefault();


    try {


      setLoading(true);

      setError("");



      const response = await api.post(
        "/auth/login",
        form
      );



      // salva token JWT

      localStorage.setItem(
        "token",
        response.data.token
      );



      // salva usuário logado

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );



      navigate("/");



    } catch(error) {


      console.error(error);


      setError(

        error.response?.data?.message ||
        "Erro ao realizar login."

      );


    } finally {


      setLoading(false);


    }


  }




  return (


    <div className="login-container">


      <form
        className="login-box"
        onSubmit={handleSubmit}
      >


        <h2>
          FleetMS
        </h2>


        <p>
          Acesso ao sistema
        </p>



        {error && (

          <div className="login-error">

            {error}

          </div>

        )}



        <label>
          E-mail
        </label>


        <input

          type="email"

          name="email"

          value={form.email}

          onChange={handleChange}

          placeholder="admin@fleet.com"

          required

        />





        <label>
          Senha
        </label>


        <input

          type="password"

          name="password"

          value={form.password}

          onChange={handleChange}

          placeholder="123456"

          required

        />





        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Entrando..."
            : "Entrar"
          }


        </button>



      </form>


    </div>


  );


}


export default Login;