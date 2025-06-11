// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    font-family: Arial, sans-serif; /* Exemplo de fonte */
    overflow: hidden; /* Garante que o mapa ocupe 100% sem scroll */
  }
`;