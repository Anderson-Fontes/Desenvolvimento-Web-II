import styled from "styled-components";
import { useContext } from "react";
import { LotteryContext } from "../contexts/LotteryContext";
import { Ball } from "../components/Ball";
import { ThemeProps } from "../types";

const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: 20px;
`;

const Title = styled.h1<ThemeProps>`
  color: ${(props) => props.theme.text};
  margin-bottom: 30px;
`;

const BallsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const InfoText = styled.p<ThemeProps>`
  color: ${(props) => props.theme.text};
  text-align: center;
  max-width: 600px;
  line-height: 1.5;
`;

export function Megasena() {
  const { megasena, loading } = useContext(LotteryContext);

  if (loading) {
    return (
      <Container>
        <Title>Carregando...</Title>
      </Container>
    );
  }

  if (!megasena) {
    return (
      <Container>
        <Title>Não foi possível carregar os dados</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Resultado Mega-Sena</Title>
      <BallsContainer>
        {megasena.dezenas.map((dezena, index) => (
          <Ball key={index} number={dezena} />
        ))}
      </BallsContainer>
      <InfoText>
        Concurso {megasena.numeroDoConcurso} - {megasena.dataPorExtenso}
      </InfoText>
      <InfoText>
        Próximo concurso: {megasena.dataProximoConcurso} | Valor estimado: R${" "}
        {megasena.valorEstimadoProximoConcurso.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </InfoText>
    </Container>
  );
}