import axios from "axios";

export const ApiInstance = axios.create({
  baseURL: "http://backend-routercraft.test/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token JWT a las solicitudes
ApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
