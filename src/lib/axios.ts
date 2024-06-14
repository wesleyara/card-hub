import axios from "axios";

// cria uma instância do axios com a baseURL da API
export const api = axios.create({
  baseURL: "https://cards-marketplace-api.onrender.com",
});
