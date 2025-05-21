import styled from "styled-components";
import { ThemeProps } from "../types";

interface BallProps extends ThemeProps {
  number: string;
}

const BallContainer = styled.div<ThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.ball.background};
  color: ${(props) => props.theme.ball.text};
  font-weight: bold;
  margin: 0 5px;
  font-size: 1.2rem;
`;

export function Ball({ number, theme }: BallProps) {
  // Garante que o número tenha sempre 2 dígitos
  const formattedNumber = number?.toString().padStart(2, '0') || '00';
  
  return <BallContainer theme={theme}>{formattedNumber}</BallContainer>;
}