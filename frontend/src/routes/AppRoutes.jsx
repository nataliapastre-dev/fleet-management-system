import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Vehicles from "../pages/Vehicles";
import ServiceOrders from "../pages/ServiceOrders";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/service-orders" element={<ServiceOrders />} />
    </Routes>
  );
}

export default AppRoutes;