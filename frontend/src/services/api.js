import axios from "axios";


const api = axios.create({

  baseURL: "https://fleet-management-api-t9in.onrender.com",

});



// =====================================
// ENVIA TOKEN JWT AUTOMATICAMENTE
// =====================================

api.interceptors.request.use(

  (config) => {


    const token = localStorage.getItem("token");


    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

  },


  (error) => {

    return Promise.reject(error);

  }

);



export default api;