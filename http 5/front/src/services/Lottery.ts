import api from "./api";
import { LotteryProps } from "../types";

export async function getLottery(): Promise<LotteryProps> {
  try {
    const { data } = await api.get("/megasena");
    console.log("Dados recebidos da API:", data);

    return {
      numeroDoConcurso: data.concurso,
      dataPorExtenso: new Date(data.data_sorteio).toLocaleDateString("pt-BR", {
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
      dataProximoConcurso: data.data_proximo_concurso || "em breve",
      valorEstimadoProximoConcurso: data.valor_estimado_proximo_concurso || 0,
    };
  } catch (error) {
    console.error("Erro ao buscar Mega-Sena:", error);
    throw error;
  }
}