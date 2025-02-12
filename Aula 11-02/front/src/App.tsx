function App() {
  return <Carro />;
}

export default App;

function Carro() {
  const marcas = [
    { marca: "Ford", modelo: "Ka", placa: "abc1234", cor:"red", fontcor:"blue"},
    { marca: "GM", modelo: "Onix", placa: "xyz4090", cor:"blue", fontcor:"red"},
    { marca: "Fiat", modelo: "Uno", placa: "opt9087", cor:"green", fontcor:"yellow"},
    { marca: "VW", modelo: "Gol", placa: "rty2002", cor:"silver", fontcor:"gold"},
  ];
  return marcas.map(function (item, indice) {
    return (
      <div style={{ backgroundColor: item.cor, color:item.fontcor}} key={indice}>
        <div>Marca: {item.marca}</div>
        <div>Modelo: {item.modelo}</div>
        <div>Placa: {item.placa}</div>
      </div>
    );
  });
}
