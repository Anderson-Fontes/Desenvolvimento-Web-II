// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Altere esta URL se o seu backend estiver em outro endereço/porta
});

export default api;