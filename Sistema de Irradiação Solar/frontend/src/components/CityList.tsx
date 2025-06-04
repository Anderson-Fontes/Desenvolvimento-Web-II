import React from 'react';
import styled from 'styled-components';
import { useCity } from '../context/CityContext';
import type { City } from '../types';

// Estilos para o painel de cidades
const CityListContainer = styled.div`
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  padding: 10px 0;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  position: relative; /* Para o spinner de loading */
`;

const CityListItem = styled.li<{ isSelected: boolean }>`
  padding: 8px 15px;
  cursor: pointer;
  list-style: none;
  &:hover {
    background-color: #e0e0e0;
  }
  background-color: ${props => props.isSelected ? '#d3eaff' : 'transparent'};
  color: ${props => props.isSelected ? '#0056b3' : '#333'};
  font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
`;

const Title = styled.h2`
  font-size: 1.2em;
  padding: 0 15px;
  margin-bottom: 10px;
  color: #333;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const Message = styled.p`
  padding: 15px;
  text-align: center;
  color: #555;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CityList: React.FC = () => {
  const { cities, selectedCity, selectCity, loadingCities, errorCities } = useCity();

  const handleCityClick = (city: City) => {
    selectCity(city);
  };

  return (
    <CityListContainer>
      <Title>Cidades</Title>
      {loadingCities && <LoadingSpinner />}
      {errorCities && <Message style={{ color: 'red' }}>{errorCities}</Message>}
      {!loadingCities && !errorCities && (
        <List>
          {cities.length === 0 && <Message>Nenhuma cidade encontrada.</Message>}
          {cities.map((city) => (
            <CityListItem
              key={city.id}
              onClick={() => handleCityClick(city)}
              isSelected={selectedCity?.id === city.id}
            >
              {city.nome}
            </CityListItem>
          ))}
        </List>
      )}
    </CityListContainer>
  );
};

export default CityList;