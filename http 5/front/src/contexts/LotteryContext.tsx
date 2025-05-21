import { createContext, useEffect, useState } from "react";
import { LotteryContextProps, Props, ProviderProps } from "../types";
import { getLottery } from "../services/Lottery";

export const LotteryContext = createContext<LotteryContextProps>({
  megasena: undefined,
  loading: false,
});

export function LotteryProvider({ children }: ProviderProps) {
  const [megasena, setMegasena] = useState<Props | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const lotteryData = await getLottery();
        
        const completeData: Props = {
          ...lotteryData,
          acumulado: false,
          concursoEspecial: false,
          dataApuracao: new Date().toISOString(),
          quantidadeGanhadores: 0,
          tipoPublicacao: 0,
          tipoJogo: "MEGA_SENA",
          valorPremio: 0,
          valorAcumuladoProximoConcurso: 0,
          valorAcumulado: 0,
        };
        
        setMegasena(completeData);
      } catch (error) {
        console.error("Error fetching lottery data:", error);
        setMegasena(undefined);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <LotteryContext.Provider value={{ megasena, loading }}>
      {children}
    </LotteryContext.Provider>
  );
}