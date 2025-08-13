import axios from "axios";
import config from "../config/env";

const api = axios.create({
  baseURL: config.api.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apikey: config.api.key,
  },
});

export default api;
