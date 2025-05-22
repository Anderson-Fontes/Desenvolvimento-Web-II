import api from "./api";
import axios from "axios";
import { LotteryProps } from "../types";

export async function getLottery(): Promise<LotteryProps> {
  const { data } = await api.get("/megasena");
  return {
    numeroDoConcurso: data.concurso,
    dataPorExtenso: new Date(data.data_do_sorteio).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }),
    dezenas: [
      String(data.bola1).padStart(2, '0'),
      String(data.bola2).padStart(2, '0'),
      String(data.bola3).padStart(2, '0'),
      String(data.bola4).padStart(2, '0'),
      String(data.bola5).padStart(2, '0'),
      String(data.bola6).padStart(2, '0'),
    ],
    dataProximoConcurso: "—",
    valorEstimadoProximoConcurso: 0,
  };
}

export async function getLotteryByNumber(numero: number): Promise<LotteryProps | null> {
  try {
    const { data } = await api.get(`/megasena/${numero}`);
    return {
      numeroDoConcurso: data.concurso,
      dataPorExtenso: new Date(data.data_do_sorteio).toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      dezenas: [
        String(data.bola1).padStart(2, '0'),
        String(data.bola2).padStart(2, '0'),
        String(data.bola3).padStart(2, '0'),
        String(data.bola4).padStart(2, '0'),
        String(data.bola5).padStart(2, '0'),
        String(data.bola6).padStart(2, '0'),
      ],
      dataProximoConcurso: "—",
      valorEstimadoProximoConcurso: 0,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}
