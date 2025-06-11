// src/App.tsx
import React from 'react';
import MapComponent from './components/MapComponent';
import CityList from './components/CityList';
import SectorInfo from './components/SectorInfo'; // Importe o componente de informações do setor
import styled from 'styled-components';

const AppContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function App() {
  return (
    <AppContainer>
      <MapComponent />
      <CityList />
      <SectorInfo /> {/* Renderize o componente de informações do setor */}
    </AppContainer>
  );
}

export default App;