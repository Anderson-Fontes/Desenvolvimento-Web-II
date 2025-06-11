// src/context/CensoContext.tsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { getCensoDataByCity, getCensoDataByPoint } from '../services/censoService';
import type { CensoCityData, SectorDetails } from '../services/censoService'; // Mantenha como type-only import

// Interfaces para os tipos de dados do contexto
interface CensoContextType {
  selectedCity: string;
  censoData: CensoCityData | null;
  selectedSector: SectorDetails | null;
  loading: boolean;
  error: string | null;
  setSelectedCity: (city: string) => void;
  setSelectedSector: (sector: SectorDetails | null) => void;
  fetchCensoData: (city: string) => Promise<void>;
  fetchSectorDetails: (x: number, y: number) => Promise<void>;
}

interface CensoProviderProps {
  children: ReactNode;
}

// src/context/CensoContext.tsx (continuação)

// Cria o contexto com um valor padrão (que será sobrescrito pelo Provider)
const CensoContext = createContext<CensoContextType | undefined>(undefined);

export const CensoProvider: React.FC<CensoProviderProps> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<string>('Jacareí'); // Inicia com Jacareí
  const [censoData, setCensoData] = useState<CensoCityData | null>(null);
  const [selectedSector, setSelectedSector] = useState<SectorDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os dados do censo de uma cidade
  const fetchCensoData = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCensoDataByCity(city);
      setCensoData(data);
      setSelectedSector(null); // Limpa o setor selecionado ao trocar de cidade
    } catch (err) {
      console.error('Erro ao buscar dados do censo:', err);
      setError('Não foi possível carregar os dados do município.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para buscar os detalhes de um setor por ponto
  const fetchSectorDetails = useCallback(async (x: number, y: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCensoDataByPoint(x, y);
      setSelectedSector(data);
    } catch (err) {
      console.error('Erro ao buscar detalhes do setor:', err);
      setError('Não foi possível carregar os detalhes do setor.');
      setSelectedSector(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Efeito para carregar os dados da cidade inicial (Jacareí)
  useEffect(() => {
    fetchCensoData(selectedCity);
  }, [selectedCity, fetchCensoData]); // Depende de selectedCity e fetchCensoData

  // O valor que será provido para os componentes que consumirem este contexto
  const contextValue: CensoContextType = {
    selectedCity,
    censoData,
    selectedSector,
    loading,
    error,
    setSelectedCity,
    setSelectedSector,
    fetchCensoData,
    fetchSectorDetails,
  };

  return (
    <CensoContext.Provider value={contextValue}>
      {children}
    </CensoContext.Provider>
  );
};

// Hook personalizado para consumir o contexto
export const useCenso = () => {
  const context = useContext(CensoContext);
  if (context === undefined) {
    throw new Error('useCenso deve ser usado dentro de um CensoProvider');
  }
  return context;
};