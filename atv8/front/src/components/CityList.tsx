
import React from 'react';
import styled from 'styled-components';
import { useCenso } from '../context/CensoContext';

// Lista de municípios disponíveis conforme o requisito
const availableCities = [
  "Campinas",
  "Jacareí",
  "São José dos Campos",
  "Sorocaba",
  "Ribeirão Preto",
  "São José do Rio Preto",
  "Piracicaba",
];

// Estilização do container da lista de cidades
const CityListContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.9); // Fundo semi-transparente
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1; // Garante que fique acima do mapa
  min-width: 200px;
  max-height: calc(100vh - 40px); // Ajusta para não ultrapassar a altura da tela
  overflow-y: auto; // Adiciona scroll se a lista for muito longa
`;

const Title = styled.h3`
  margin-bottom: 10px;
  color: #333;
  font-size: 1.1em;
`;

const CityItem = styled.div<{ isSelected: boolean }>`
  padding: 8px 0;
  cursor: pointer;
  color: ${props => (props.isSelected ? '#007bff' : '#555')}; // Azul para selecionado
  font-weight: ${props => (props.isSelected ? 'bold' : 'normal')};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #0056b3;
    transform: translateX(3px); // Efeito visual ao passar o mouse
  }
`;

const CityList: React.FC = () => {
  // Removido 'fetchCensoData' pois não é usado diretamente aqui
  const { selectedCity, setSelectedCity, loading } = useCenso();

  const handleCityClick = (city: string) => {
    if (city !== selectedCity && !loading) {
      setSelectedCity(city);
      // fetchCensoData(city) será chamado automaticamente pelo useEffect no CensoProvider
    }
  };

  return (
    <CityListContainer>
      <Title>Cidades:</Title>
      {availableCities.map((city) => (
        <CityItem
          key={city}
          isSelected={city === selectedCity}
          onClick={() => handleCityClick(city)}
        >
          {city}
        </CityItem>
      ))}
      {loading && <p>Carregando...</p>}
    </CityListContainer>
  );
};

export default CityList;