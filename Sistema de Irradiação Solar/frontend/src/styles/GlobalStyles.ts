import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset */
  *, *::before, *::after {
    margin: 0; padding: 0; box-sizing: border-box;
  }

  :root {
    --neutral-50: #bfbfbf; /* cinza claro */
    --neutral-100: #a6a6a6;
    --neutral-200: #8c8c8c;
    --neutral-300: #737373;
    --neutral-400: #595959;
    --neutral-500: #404040;
    --neutral-600: #2e2e2e;
    --neutral-700: #1f1f1f;
    --neutral-800: #121212; /* fundo escuro */
    --neutral-900: #0a0a0a;

    --primary-400: #7a6f65; /* tom neutro quente */
    --primary-300: #927f72;

    /* Espaçamentos */
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --radius-sm: 4px;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--neutral-800);
    color: var(--neutral-200);
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--neutral-50);
  }

  p {
    color: var(--neutral-300);
  }

  a {
    color: var(--primary-400);
    text-decoration: none;

    &:hover {
      color: var(--primary-300);
      text-decoration: underline;
    }
  }

  button, input, select, textarea {
    background-color: var(--neutral-700);
    color: var(--neutral-100);
    border: 1px solid var(--neutral-600);
    border-radius: var(--radius-sm);
    padding: var(--space-sm) var(--space-md);
  }

  button:hover {
    background-color: var(--neutral-600);
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: var(--neutral-700);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--neutral-500);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--neutral-400);
  }

  #root {
    min-height: 100vh;
    background-color: var(--neutral-800);
  }
`;
