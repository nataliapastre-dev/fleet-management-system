import { Link } from "react-router-dom";

import {
  FaCar,
  FaClipboardList,
  FaChartBar,
  FaPlus,
  FaUserTie,
  FaFileContract,
  FaTools,
  FaUsers
} from "react-icons/fa";



function Sidebar() {


  return (


    <aside className="sidebar">



      <h2>
        FleetMS
      </h2>





      <nav>

        <ul>





          {/* ======================
              DASHBOARD
          ====================== */}


          <li>

            <Link to="/">

              <FaChartBar />

              Dashboard

            </Link>

          </li>









          {/* ======================
              VEÍCULOS
          ====================== */}


          <li>

            <Link to="/vehicles">

              <FaCar />

              Veículos

            </Link>

          </li>



          <li>

            <Link to="/new-vehicle">

              <FaPlus />

              Novo Veículo

            </Link>

          </li>









          {/* ======================
              MOTORISTAS
          ====================== */}


          <li>

            <Link to="/drivers">

              <FaUserTie />

              Motoristas

            </Link>

          </li>



          <li>

            <Link to="/new-driver">

              <FaPlus />

              Novo Motorista

            </Link>

          </li>









          {/* ======================
              CONTRATOS
          ====================== */}


          <li>

            <Link to="/contracts">

              <FaFileContract />

              Contratos

            </Link>

          </li>



          <li>

            <Link to="/new-contract">

              <FaPlus />

              Novo Contrato

            </Link>

          </li>









          {/* ======================
              MANUTENÇÕES
          ====================== */}


          <li>

            <Link to="/maintenance">

              <FaTools />

              Manutenções

            </Link>

          </li>



          <li>

            <Link to="/new-maintenance">

              <FaPlus />

              Nova Manutenção

            </Link>

          </li>









          {/* ======================
              ORDENS DE SERVIÇO
          ====================== */}


          <li>

            <Link to="/service-orders">

              <FaClipboardList />

              Ordens de Serviço

            </Link>

          </li>



          <li>

            <Link to="/new-service-order">

              <FaPlus />

              Nova OS

            </Link>

          </li>









          {/* ======================
              USUÁRIOS
          ====================== */}


          <li>

            <Link to="/users">

              <FaUsers />

              Usuários

            </Link>

          </li>



          <li>

            <Link to="/users/new">

              <FaPlus />

              Novo Usuário

            </Link>

          </li>






        </ul>


      </nav>




    </aside>


  );


}



export default Sidebar;