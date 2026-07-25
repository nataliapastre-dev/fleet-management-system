import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";


// ======================
// VEÍCULOS
// ======================

import Vehicles from "./pages/Vehicles";
import NewVehicle from "./pages/NewVehicle";
import EditVehicle from "./pages/EditVehicle";


// ======================
// MOTORISTAS
// ======================

import Drivers from "./pages/Drivers";
import NewDriver from "./pages/NewDriver";
import EditDriver from "./pages/EditDriver";


// ======================
// CONTRATOS
// ======================

import Contracts from "./pages/Contracts";
import NewContract from "./pages/NewContract";
import EditContract from "./pages/EditContract";


// ======================
// MANUTENÇÃO
// ======================

import Maintenance from "./pages/Maintenance";
import NewMaintenance from "./pages/NewMaintenance";
import EditMaintenance from "./pages/EditMaintenance";


// ======================
// ORDENS DE SERVIÇO
// ======================

import ServiceOrders from "./pages/ServiceOrders";
import NewServiceOrder from "./pages/NewServiceOrder";
import EditServiceOrder from "./pages/EditServiceOrder";


// ======================
// USUÁRIOS
// ======================

import Users from "./pages/Users";
import NewUser from "./pages/NewUser";
import EditUser from "./pages/EditUser";


import "./App.css";




function Layout() {


  return (

    <div className="layout">


      <Sidebar />


      <div className="content">


        <Header />


        <Routes>


          {/* DASHBOARD */}

          <Route
            path="/"
            element={<Dashboard />}
          />



          {/* VEÍCULOS */}

          <Route
            path="/vehicles"
            element={<Vehicles />}
          />


          <Route
            path="/new-vehicle"
            element={<NewVehicle />}
          />


          <Route
            path="/edit-vehicle/:id"
            element={<EditVehicle />}
          />





          {/* MOTORISTAS */}

          <Route
            path="/drivers"
            element={<Drivers />}
          />


          <Route
            path="/new-driver"
            element={<NewDriver />}
          />


          <Route
            path="/edit-driver/:id"
            element={<EditDriver />}
          />





          {/* CONTRATOS */}

          <Route
            path="/contracts"
            element={<Contracts />}
          />


          <Route
            path="/new-contract"
            element={<NewContract />}
          />


          <Route
            path="/edit-contract/:id"
            element={<EditContract />}
          />





          {/* MANUTENÇÃO */}

          <Route
            path="/maintenance"
            element={<Maintenance />}
          />


          <Route
            path="/new-maintenance"
            element={<NewMaintenance />}
          />


          <Route
            path="/edit-maintenance/:id"
            element={<EditMaintenance />}
          />





          {/* ORDENS DE SERVIÇO */}

          <Route
            path="/service-orders"
            element={<ServiceOrders />}
          />


          <Route
            path="/new-service-order"
            element={<NewServiceOrder />}
          />


          <Route
            path="/edit-service-order/:id"
            element={<EditServiceOrder />}
          />





          {/* USUÁRIOS */}

          <Route
            path="/users"
            element={<Users />}
          />


          <Route
            path="/users/new"
            element={<NewUser />}
          />


          <Route
            path="/users/edit/:id"
            element={<EditUser />}
          />


        </Routes>


      </div>


    </div>

  );

}




function App() {


  return (

    <Routes>


      {/* LOGIN */}

      <Route
        path="/login"
        element={<Login />}
      />



      {/* SISTEMA PROTEGIDO */}

      <Route

        path="/*"

        element={

          <PrivateRoute>

            <Layout />

          </PrivateRoute>

        }

      />


    </Routes>

  );


}


export default App;