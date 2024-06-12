import axios from "axios";

export const api = axios.create({
  baseURL: "https://cards-marketplace-api.onrender.com",
});
