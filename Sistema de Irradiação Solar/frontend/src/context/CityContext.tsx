import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {ReactNode} from 'react';
import type { City, IncidenceData } from '../types';
import { getCities, getIncidenceByCityId } from '../api';

// Define a estrutura do contexto
interface CityContextType {
  cities: City[];
  selectedCity: City | null;
  incidenceData: IncidenceData[];
  loadingCities: boolean;
  loadingIncidence: boolean;
  errorCities: string | null;
  errorIncidence: string | null;
  selectCity: (city: City | null) => void;
  clearIncidenceData: () => void;
}

// Cria o contexto com valores padrão
const CityContext = createContext<CityContextType | undefined>(undefined);

// Provider do contexto
export const CityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [incidenceData, setIncidenceData] = useState<IncidenceData[]>([]);
  const [loadingCities, setLoadingCities] = useState<boolean>(true);
  const [loadingIncidence, setLoadingIncidence] = useState<boolean>(false);
  const [errorCities, setErrorCities] = useState<string | null>(null);
  const [errorIncidence, setErrorIncidence] = useState<string | null>(null);

  // Função para carregar as cidades
  useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true);
      setErrorCities(null);
      try {
        const data = await getCities();
        setCities(data);
      } catch (err) {
        setErrorCities("Não foi possível carregar as cidades. Tente novamente mais tarde.");
        console.error(err);
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, []);

  // Função para carregar os dados de irradiação quando uma cidade é selecionada
  useEffect(() => {
    const fetchIncidenceData = async () => {
      if (selectedCity) {
        setLoadingIncidence(true);
        setErrorIncidence(null);
        try {
          const data = await getIncidenceByCityId(selectedCity.id);
          setIncidenceData(data);
        } catch (err) {
          setErrorIncidence(`Não foi possível carregar os dados de irradiação para ${selectedCity.nome}.`);
          console.error(err);
        } finally {
          setLoadingIncidence(false);
        }
      } else {
        setIncidenceData([]); // Limpa os dados de irradiação se nenhuma cidade estiver selecionada
      }
    };
    fetchIncidenceData();
  }, [selectedCity]);

  // Função para selecionar uma cidade
  const selectCity = useCallback((city: City | null) => {
    setSelectedCity(city);
  }, []);

  // Função para limpar os dados de incidência (se necessário, por exemplo, ao deselecionar uma cidade)
  const clearIncidenceData = useCallback(() => {
    setIncidenceData([]);
  }, []);

  const value = {
    cities,
    selectedCity,
    incidenceData,
    loadingCities,
    loadingIncidence,
    errorCities,
    errorIncidence,
    selectCity,
    clearIncidenceData,
  };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};

// Hook customizado para usar o contexto
export const useCity = () => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};