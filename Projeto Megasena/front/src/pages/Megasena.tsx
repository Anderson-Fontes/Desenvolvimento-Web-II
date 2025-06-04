import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { LotteryContext } from "../contexts/LotteryContext";
import { Ball } from "../components/Ball";
import { ThemeProps, LotteryProps } from "../types";
import { getLotteryByNumber } from "../services/Lottery";

const Container = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme?.background};
  color: ${(props) => props.theme?.text};
  padding: 20px;
`;

const Title = styled.h1<ThemeProps>`
  color: ${(props) => props.theme?.text};
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
  color: ${(props) => props.theme?.text};
  text-align: center;
  max-width: 600px;
  line-height: 1.5;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  background-color: #209869;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1a7a5a;
  }
`;

const ErrorMessage = styled.p`
  color: #ff3333;
  font-weight: bold;
`;

export function Megasena() {
  const { megasena, loading, error } = useContext(LotteryContext);
  const [search, setSearch] = useState("");
  const [resultado, setResultado] = useState<LotteryProps | null>(megasena);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    setResultado(megasena);
  }, [megasena]);

  const handleSearch = async () => {
    const numero = parseInt(search);
    if (isNaN(numero)) {
      setMensagem("Digite um número válido.");
      return;
    }

    try {
      const result = await getLotteryByNumber(numero);
      if (result) {
        setResultado(result);
        setMensagem("");
      } else {
        setMensagem("Concurso não encontrado.");
      }
    } catch (err) {
      setMensagem("Erro ao buscar concurso.");
      console.error("Erro na busca:", err);
    }
  };

  if (loading) {
    return (
      <Container>
        <Title>Carregando...</Title>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Erro</Title>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (!resultado) {
    return (
      <Container>
        <Title>Não foi possível carregar os dados</Title>
        <ErrorMessage>Os resultados não estão disponíveis no momento</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Resultado Mega-Sena</Title>

      <div>
        <Input
          type="number"
          placeholder="Digite o número do concurso"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      {mensagem && <ErrorMessage>{mensagem}</ErrorMessage>}

      <BallsContainer>
        {resultado.dezenas.map((dezena, index) => (
          <Ball key={index} number={dezena} />
        ))}
      </BallsContainer>
      
      <InfoText>
        Concurso {resultado.numeroDoConcurso} - {resultado.dataPorExtenso}
      </InfoText>
      <InfoText>
        Próximo concurso: {resultado.dataProximoConcurso} | Valor estimado: R$
        {resultado.valorEstimadoProximoConcurso.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </InfoText>
    </Container>
  );
}