// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3006", // agora aponta para seu back-end local
});

export default api;
