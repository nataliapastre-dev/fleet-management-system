import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditDriver() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [driver, setDriver] = useState({
    name: "",
    cpf: "",
    cnh: "",
    category: "",
    expiration_date: "",
    phone: "",
    email: "",
    status: "Ativo",
  });

  useEffect(() => {
    loadDriver();
  }, []);

  async function loadDriver() {
    try {
      const response = await api.get(`/drivers/${id}`);

      setDriver(response.data);

    } catch (error) {
      console.error(
        "Erro ao buscar motorista:",
        error
      );

      alert("Erro ao carregar motorista.");
    }
  }


  function handleChange(event) {
    setDriver({
      ...driver,
      [event.target.name]: event.target.value,
    });
  }


  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.put(`/drivers/${id}`, driver);

      alert("Motorista atualizado com sucesso!");

      navigate("/drivers");

    } catch (error) {
      console.error(
        "Erro ao atualizar motorista:",
        error
      );

      alert("Erro ao atualizar motorista.");
    }
  }


  return (
    <div className="page">

      <h2>Editar Motorista</h2>


      <form onSubmit={handleSubmit}>

        <label>
          Nome:
        </label>

        <input
          type="text"
          name="name"
          value={driver.name}
          onChange={handleChange}
          required
        />


        <label>
          CPF:
        </label>

        <input
          type="text"
          name="cpf"
          value={driver.cpf}
          onChange={handleChange}
          required
        />


        <label>
          CNH:
        </label>

        <input
          type="text"
          name="cnh"
          value={driver.cnh}
          onChange={handleChange}
          required
        />


        <label>
          Categoria:
        </label>

        <select
          name="category"
          value={driver.category}
          onChange={handleChange}
          required
        >
          <option value="">
            Selecione
          </option>

          <option value="A">
            A
          </option>

          <option value="B">
            B
          </option>

          <option value="AB">
            AB
          </option>

          <option value="C">
            C
          </option>

          <option value="D">
            D
          </option>

          <option value="E">
            E
          </option>

        </select>


        <label>
          Validade da CNH:
        </label>

        <input
          type="date"
          name="expiration_date"
          value={driver.expiration_date}
          onChange={handleChange}
          required
        />


        <label>
          Telefone:
        </label>

        <input
          type="text"
          name="phone"
          value={driver.phone}
          onChange={handleChange}
        />


        <label>
          E-mail:
        </label>

        <input
          type="email"
          name="email"
          value={driver.email}
          onChange={handleChange}
        />


        <label>
          Status:
        </label>

        <select
          name="status"
          value={driver.status}
          onChange={handleChange}
        >

          <option value="Ativo">
            Ativo
          </option>

          <option value="Inativo">
            Inativo
          </option>

          <option value="Afastado">
            Afastado
          </option>

        </select>


        <button type="submit">
          Atualizar Motorista
        </button>

      </form>

    </div>
  );
}

export default EditDriver;