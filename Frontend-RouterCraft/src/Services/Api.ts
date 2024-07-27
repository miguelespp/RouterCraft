import axios from "axios";

export const ApiInstance = axios.create({
  baseURL: process.env.URL_API_BACKEND || "http://localhost:8000",
  timeout: 8000,
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
