import { ReactNode } from "react";

export interface LotteryContextProps {
  megasena: Props | undefined;
  loading: boolean;
}

export interface LotteryProps {
  megasena: Props;
}

export interface Props {
  acumulado: boolean;
  concursoEspecial: boolean;
  dataApuracao: string;
  dataPorExtenso: string;
  dataProximoConcurso: string;
  dezenas: string[];
  numeroDoConcurso: number;
  quantidadeGanhadores: number;
  tipoPublicacao: number;
  tipoJogo: string;
  valorEstimadoProximoConcurso: number;
  valorPremio: number;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface ThemeType {
  background: string;
  text: string;
  ball: {
    background: string;
    text: string;
  };
}

export interface ThemeProps {
  theme: ThemeType;
}