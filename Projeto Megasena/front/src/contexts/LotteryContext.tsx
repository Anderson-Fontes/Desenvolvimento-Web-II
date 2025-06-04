import { createContext, ReactNode, useState, useEffect } from "react";
import { getLottery } from "../services/Lottery";
import { LotteryProps } from "../types";

interface LotteryContextData {
  megasena: LotteryProps | null;
  loading: boolean;
  error: string | null;
}

export const LotteryContext = createContext<LotteryContextData>({
  megasena: null,
  loading: true,
  error: null
});

export function LotteryProvider({ children }: { children: ReactNode }) {
  const [megasena, setMegasena] = useState<LotteryProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const data = await getLottery();
        setMegasena(data);
      } catch (err) {
        setError("Erro ao carregar dados da Mega-Sena");
        console.error("Erro no LotteryProvider:", err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  return (
    <LotteryContext.Provider value={{ megasena, loading, error }}>
      {children}
    </LotteryContext.Provider>
  );
}