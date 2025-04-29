import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Megasena } from "./pages/Megasena";
import { LotteryProvider } from "./contexts/LotteryContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { lightTheme, darkTheme } from "./theme";

const ThemeToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #209869;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <LotteryProvider>
        <Megasena />
        <ThemeToggleButton onClick={toggleTheme}>
          {isDarkTheme ? <FaSun size={20} /> : <FaMoon size={20} />}
        </ThemeToggleButton>
      </LotteryProvider>
    </ThemeProvider>
  );
}

export default App;