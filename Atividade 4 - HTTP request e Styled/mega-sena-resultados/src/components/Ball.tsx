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
`;

export function Ball({ number }: BallProps) {
  return <BallContainer>{number}</BallContainer>;
}