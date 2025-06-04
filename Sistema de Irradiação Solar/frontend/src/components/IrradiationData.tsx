import React from 'react';
import styled from 'styled-components';
import { useCity } from '../context/CityContext';

const IrradiationDataContainer = styled.div`
  width: 280px;
  background-color: #fff;
  border-left: 1px solid #ddd;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  position: relative; /* Para o spinner */
`;

const Title = styled.h2`
  font-size: 1.3em;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

const Value = styled.span`
  color: #007bff;
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

const IrradiationData: React.FC = () => {
  const { selectedCity, incidenceData, loadingIncidence, errorIncidence } = useCity();

  if (!selectedCity) {
    return (
      <IrradiationDataContainer>
        <Title>Dados de Irradiação</Title>
        <Message>Selecione uma cidade para ver os dados de irradiação.</Message>
      </IrradiationDataContainer>
    );
  }

  if (loadingIncidence) {
    return (
      <IrradiationDataContainer>
        <Title>Dados de Irradiação de {selectedCity.nome}</Title>
        <LoadingSpinner />
        <Message>Carregando dados de irradiação...</Message>
      </IrradiationDataContainer>
    );
  }

  if (errorIncidence) {
    return (
      <IrradiationDataContainer>
        <Title>Dados de Irradiação de {selectedCity.nome}</Title>
        <Message style={{ color: 'red' }}>{errorIncidence}</Message>
      </IrradiationDataContainer>
    );
  }

  if (incidenceData.length === 0) {
    return (
      <IrradiationDataContainer>
        <Title>Dados de Irradiação de {selectedCity.nome}</Title>
        <Message>Nenhum dado de irradiação encontrado para esta cidade.</Message>
      </IrradiationDataContainer>
    );
  }

  // Considerando que para uma cidade, os dados de irradiação seriam aggregated ou representados por um único polígono principal
  // Se a API retornar múltiplos, podemos exibir o primeiro ou somar/média.
  // Para este exemplo, vamos exibir os dados do primeiro item retornado.
  const data = incidenceData[0];

  return (
    <IrradiationDataContainer>
      <Title>Irradiação Solar - {selectedCity.nome}</Title>
      <DataRow><Label>Anual:</Label> <Value>{data.anual} kWh/m²</Value></DataRow>
      <DataRow><Label>Jan:</Label> <Value>{data.jan} kWh/m²</Value></DataRow>
      <DataRow><Label>Fev:</Label> <Value>{data.fev} kWh/m²</Value></DataRow>
      <DataRow><Label>Mar:</Label> <Value>{data.mar} kWh/m²</Value></DataRow>
      <DataRow><Label>Abr:</Label> <Value>{data.abr} kWh/m²</Value></DataRow>
      <DataRow><Label>Mai:</Label> <Value>{data.mai} kWh/m²</Value></DataRow>
      <DataRow><Label>Jun:</Label> <Value>{data.jun} kWh/m²</Value></DataRow>
      <DataRow><Label>Jul:</Label> <Value>{data.jul} kWh/m²</Value></DataRow>
      <DataRow><Label>Ago:</Label> <Value>{data.ago} kWh/m²</Value></DataRow>
      <DataRow><Label>Set:</Label> <Value>{data.set} kWh/m²</Value></DataRow>
      <DataRow><Label>Out:</Label> <Value>{data.out} kWh/m²</Value></DataRow>
      <DataRow><Label>Nov:</Label> <Value>{data.nov} kWh/m²</Value></DataRow>
      <DataRow><Label>Dez:</Label> <Value>{data.dez} kWh/m²</Value></DataRow>
    </IrradiationDataContainer>
  );
};

export default IrradiationData;