import axios from "axios";
import config from "../config/env";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: config.api.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.api.key}`,
  },
});

export default api;
