import { useEffect, useState } from "react";
import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";


import {
  FaCar,
  FaTools,
  FaMoneyBill,
  FaExclamationTriangle,
  FaUserTie,
  FaWrench
} from "react-icons/fa";



function Dashboard() {


  const [dashboard, setDashboard] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [costs, setCosts] = useState([]);



  useEffect(() => {


    async function loadDashboard() {


      try {


        const dashboardResponse = await api.get("/dashboard");


        setDashboard(
          dashboardResponse.data
        );



        try {

          const alertsResponse =
            await api.get("/dashboard/alerts");

          setAlerts(
            alertsResponse.data || []
          );


        } catch(error) {

          console.error(
            "Erro nos alertas:",
            error
          );

          setAlerts([]);

        }





        try {


          const costsResponse =
            await api.get("/dashboard/maintenance-costs");


          const formattedCosts =
            (costsResponse.data || []).map(item => ({

              month:item.month,

              cost:Number(
                item.cost || 0
              )

            }));


          setCosts(
            formattedCosts
          );


        } catch(error) {


          console.error(
            "Erro nos custos:",
            error
          );


          setCosts([]);

        }



      } catch(error) {


        console.error(
          "Erro ao carregar dashboard:",
          error
        );


      }


    }



    loadDashboard();


  }, []);





  if(!dashboard) {


    return (

      <div className="dashboard">

        <h2>
          Carregando dashboard...
        </h2>

      </div>

    );

  }





  const statusData = [

    {
      name:"Disponíveis",
      value:dashboard.available || 0,
      color:"#22c55e"
    },

    {
      name:"Manutenção",
      value:dashboard.maintenance || 0,
      color:"#f59e0b"
    },

    {
      name:"Indisponíveis",
      value:dashboard.unavailable || 0,
      color:"#ef4444"
    }

  ];





  function moneyFormat(value) {

    return new Intl.NumberFormat(
      "pt-BR",
      {
        style:"currency",
        currency:"BRL"
      }

    ).format(
      Number(value || 0)
    );

  }





  const totalServiceOrders =
    dashboard.lastOrders?.reduce(
      (total, order)=>
        total + Number(order.cost || 0),
      0
    ) || 0;



  const totalFleetCost =
    Number(dashboard.maintenanceCost || 0)
    +
    totalServiceOrders;





  return (

    <div className="dashboard">


      <h2>
        Dashboard
      </h2>



      <div className="cards">


        <div className="card">

          <FaCar size={30}/>

          <div>

            <h3>
              Veículos
            </h3>

            <p>
              {dashboard.totalVehicles}
            </p>

          </div>

        </div>




        <div className="card">

          <FaUserTie size={30}/>

          <div>

            <h3>
              Motoristas
            </h3>

            <p>
              {dashboard.totalDrivers}
            </p>

          </div>

        </div>




        <div className="card">

          <FaTools size={30}/>

          <div>

            <h3>
              OS Abertas
            </h3>

            <p>
              {dashboard.openOrders}
            </p>

          </div>

        </div>




        <div className="card">

          <FaWrench size={30}/>

          <div>

            <h3>
              Manutenções
            </h3>

            <p>
              {dashboard.totalMaintenances}
            </p>

          </div>

        </div>




        <div className="card">

          <FaMoneyBill size={30}/>

          <div>

            <h3>
              Custos
            </h3>

            <p>
              {moneyFormat(totalFleetCost)}
            </p>

          </div>

        </div>




        <div className="card">

          <FaExclamationTriangle size={30}/>

          <div>

            <h3>
              Alertas
            </h3>

            <p>
              {alerts.length}
            </p>

          </div>

        </div>


      </div>





      <div className="dashboard-section">

        <h3>
          Status da Frota
        </h3>


        <ResponsiveContainer width="100%" height={350}>

          <PieChart>


            <Pie

              data={statusData}

              dataKey="value"

              nameKey="name"

              cx="50%"

              cy="50%"

              innerRadius={75}

              outerRadius={120}

              label

            >

              {
                statusData.map(
                  (item,index)=>(

                    <Cell

                      key={index}

                      fill={item.color}

                    />

                  )
                )
              }


            </Pie>


            <Tooltip/>

            <Legend/>


          </PieChart>


        </ResponsiveContainer>


      </div>





      <div className="dashboard-section">


        <h3>
          Custos de Manutenção por Mês
        </h3>


        {
          costs.length === 0 ?

          <p>
            Nenhum custo registrado.
          </p>

          :

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={costs}>


              <CartesianGrid strokeDasharray="3 3"/>


              <XAxis dataKey="month"/>


              <YAxis/>


              <Tooltip
                formatter={(value)=>
                  moneyFormat(value)
                }
              />


              <Legend/>


              <Bar
                dataKey="cost"
                name="Manutenção"
                fill="#2563eb"
              />


            </BarChart>


          </ResponsiveContainer>

        }


      </div>





      <div className="dashboard-section">

        <h3>
          Últimas Ordens de Serviço
        </h3>


        {
          dashboard.lastOrders?.map(order=>(

            <div
              className="order-card"
              key={order.id}
            >

              <strong>

                {order.model}
                {" - "}
                {order.plate}

              </strong>


              <p>
                {order.description}
              </p>


              <small>

                Custo:
                {" "}
                {moneyFormat(order.cost)}

                {" | "}

                Status:
                {" "}
                {order.status}

              </small>


            </div>


          ))

        }


      </div>


    </div>

  );


}


export default Dashboard;