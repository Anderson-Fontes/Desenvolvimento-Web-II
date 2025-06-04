import React from 'react';
import styled from 'styled-components';
import CityList from './components/CityList';
import MapComponent from './components/MapComponent';
import IrradiationData from './components/IrradiationData';
import { GlobalStyle } from './styles/GlobalStyles';  // Ajuste aqui conforme nome real
import { CityProvider } from './context/CityContext';

const AppContainer = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-areas:
    "header header header"
    "sidebar map data";
  grid-template-columns: 280px 1fr 320px;
  grid-template-rows: 60px 1fr;
  overflow: hidden;
  background-color: var(--neutral-900);
  color: var(--neutral-100);

  @media (max-width: 1200px) {
    grid-template-areas:
      "header header"
      "sidebar map"
      "data data";
    grid-template-columns: 280px 1fr;
    grid-template-rows: 60px 1fr auto;
  }

  @media (max-width: 768px) {
    grid-template-areas:
      "header"
      "sidebar"
      "map"
      "data";
    grid-template-columns: 1fr;
    grid-template-rows: 60px auto 400px auto;
  }
`;

const Header = styled.header`
  grid-area: header;
  background-color: var(--neutral-800);
  color: var(--neutral-50);
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--neutral-700);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 10;

  h1 {
    font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin: 0;
    color: var(--neutral-50);
  }
`;

const Sidebar = styled.aside`
  grid-area: sidebar;
  background-color: var(--neutral-900);
  border-right: 1px solid var(--neutral-700);
  overflow-y: auto;
  padding: 1rem 0;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid var(--neutral-700);
  }
`;

const MapWrapper = styled.section`
  grid-area: map;
  position: relative;
  background-color: var(--neutral-800);
`;

const DataPanel = styled.section`
  grid-area: data;
  background-color: var(--neutral-900);
  border-left: 1px solid var(--neutral-700);
  overflow-y: auto;
  padding: 1.5rem;

  @media (max-width: 1200px) {
    border-left: none;
    border-top: 1px solid var(--neutral-700);
  }
`;

const App: React.FC = () => {
  return (
    <CityProvider>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <h1>🌞 Sistema de Irradiação Solar</h1>
        </Header>

        <Sidebar>
          <CityList />
        </Sidebar>

        <MapWrapper>
          <MapComponent />
        </MapWrapper>

        <DataPanel>
          <IrradiationData />
        </DataPanel>
      </AppContainer>
    </CityProvider>
  );
};

export default App;
