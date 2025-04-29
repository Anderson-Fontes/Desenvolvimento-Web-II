import { createContext, useEffect, useState } from "react";
import { LotteryContextProps, Props, ProviderProps } from "../types";
import { getLottery } from "../services/Lottery";

export const LotteryContext = createContext({} as LotteryContextProps);

export function LotteryProvider({ children }: ProviderProps) {
  const [megasena, setMegasena] = useState<Props | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const result = await getLottery();
        if ("megasena" in result) {
          setMegasena(result.megasena);
        }
      } catch (error) {
        console.error("Error fetching lottery data:", error);
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