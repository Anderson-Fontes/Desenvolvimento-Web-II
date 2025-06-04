import axios from "axios";
import type { City, IncidenceData } from "../types";

// URL base do seu backend
const API_BASE_URL = "http://localhost:3001"; // Ajuste esta URL se o seu backend estiver em outra porta/domínio

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getCities = async (): Promise<City[]> => {
  try {
    const response = await api.get("api/cidade");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    throw error;
  }
};

export const getIncidenceByCityId = async (
  id: number
): Promise<IncidenceData[]> => {
  try {
    const response = await api.get(`api/cidade/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar incidências para a cidade ${id}:`, error);
    throw error;
  }
};
