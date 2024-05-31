import axios from "axios";

export const ApiInstance = axios.create({
  baseURL: "http://backend-routercraft.test/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
