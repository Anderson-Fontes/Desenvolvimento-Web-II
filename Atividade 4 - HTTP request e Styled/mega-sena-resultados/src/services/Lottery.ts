import { LotteryProps } from "../types";
import api from "./api";

export async function getLottery(): Promise<LotteryProps> {
  // espera 2 segundos antes de prosseguir
  await delay(2000);
  const { data } = await api.get("/");
  return data;
}

// Função para criar um delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));