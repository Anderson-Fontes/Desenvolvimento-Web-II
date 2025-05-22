import styled from "styled-components";
import { ThemeProps } from "../types";

interface BallProps {
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

export function Ball({ number }: BallProps) {
  const formattedNumber = number?.toString().padStart(2, '0') || '00';
  return <BallContainer>{formattedNumber}</BallContainer>;
}