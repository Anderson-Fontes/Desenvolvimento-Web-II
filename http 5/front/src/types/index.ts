import { ReactNode } from "react";

export interface LotteryProps {
  numeroDoConcurso: number;
  dataPorExtenso: string;
  dezenas: string[];
  dataProximoConcurso: string;
  valorEstimadoProximoConcurso: number;
}

export interface MegaSenaResult extends LotteryProps {
  acumulado: boolean;
  concursoEspecial: false;
  dataApuracao: string;
  quantidadeGanhadores: number;
  tipoPublicacao: number;
  tipoJogo: "MEGA_SENA";
  valorPremio: number;
  valorAcumuladoProximoConcurso: number;
  valorAcumulado: number;
}

export interface LotteryContextType {
  megasena: MegaSenaResult | undefined;
  loading: boolean;
}

// Alias para compatibilidade
export type LotteryContextProps = LotteryContextType;
export type Props = MegaSenaResult;

export interface ProviderProps {
  children: ReactNode;
}

export interface BallStyle {
  background: string;
  text: string;
}

export interface AppTheme {
  background: string;
  text: string;
  ball: BallStyle;
}

export interface ThemeProps {
  theme?: AppTheme;
}