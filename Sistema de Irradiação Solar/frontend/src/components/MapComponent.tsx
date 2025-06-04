import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { useCity } from "../context/CityContext";
import { type LatLngTuple, Icon, Map as LeafletMap } from "leaflet";

// Importa os ícones padrão do Leaflet, pois eles podem não ser carregados por padrão com Webpack/Vite
// @ts-expect-error: A tipagem de 'Icon.Default.prototype._getIconUrl' não está disponível diretamente no Leaflet, e esta linha é necessária para configurar o caminho dos ícones padrão para que sejam carregados corretamente do CDN.
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapContainerStyled = styled.div`
  flex-grow: 1; /* Preenche o espaço restante */
  height: 100vh;
  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

const MapComponent: React.FC = () => {
  const { selectedCity, incidenceData } = useCity();
  const mapRef = useRef<LeafletMap | null>(null);
  const initialPosition: LatLngTuple = [-14.235, -53.18]; // Centro aproximado do Brasil
  const initialZoom = 4; // Zoom inicial para ver o Brasil

  // Efeito para ajustar a visão do mapa quando uma cidade é selecionada ou dados de incidência chegam
  useEffect(() => {
    if (mapRef.current && selectedCity) {
      if (selectedCity.geometry && selectedCity.geometry.type === "Polygon") {
        // Adicionar verificações de segurança aqui
        const coordinates = selectedCity.geometry.coordinates;

        // Verifica se há pelo menos um anel e se o primeiro anel não está vazio
        if (
          coordinates &&
          coordinates.length > 0 &&
          coordinates[0] &&
          coordinates[0].length > 0
        ) {
          const latLngs = coordinates[0].map(
            (c) => [c[1], c[0]] as LatLngTuple
          ); // Mapeia os pontos [lon, lat] para [lat, lon]

          // Apenas tenta ajustar os limites se houver pelo menos dois pontos (um polígono precisa de 3+ pontos)
          // mas o fitBounds pode funcionar com menos se o objetivo é centralizar um ponto único.
          // Para evitar erros de "invalid latlng argument", garantimos que latLngs não está vazio.
          if (latLngs.length > 0) {
            mapRef.current.fitBounds(latLngs);
          } else {
            console.warn(
              `A geometria da cidade ${selectedCity.nome} não tem pontos válidos no primeiro anel.`
            );
            // Opcional: Se não houver pontos, talvez centralizar no initialPosition ou nos dados de incidência se existirem
            if (incidenceData.length > 0) {
              mapRef.current.flyTo(
                [incidenceData[0].lat, incidenceData[0].lon],
                10
              );
            } else {
              mapRef.current.flyTo(initialPosition, initialZoom);
            }
          }
        } else {
          console.warn(
            `A geometria da cidade ${selectedCity.nome} não contém um anel de coordenadas válido para um polígono.`
          );
          // Se a geometria do polígono não for válida, tenta centralizar nos dados de incidência ou na posição inicial
          if (incidenceData.length > 0) {
            mapRef.current.flyTo(
              [incidenceData[0].lat, incidenceData[0].lon],
              10
            );
          } else {
            mapRef.current.flyTo(initialPosition, initialZoom);
          }
        }
      } else if (incidenceData.length > 0) {
        // Se a cidade não tem um polígono direto, mas temos dados de incidência, usamos a primeira incidência
        mapRef.current.flyTo([incidenceData[0].lat, incidenceData[0].lon], 10); // Voa para o ponto e zoom
      } else {
        // Se selectedCity existe mas não tem geometria de polígono válida E não tem dados de incidência,
        // centraliza no ponto inicial
        mapRef.current.flyTo(initialPosition, initialZoom);
      }
    }
  }, [selectedCity, incidenceData]); // Adicionado initialPosition e initialZoom se for usar eles na dependência

  // Função para transformar coordenadas GeoJSON (lon, lat) em Leaflet (lat, lon)
  const geoJsonToLeafletLatLngs = (
    geojsonCoords: number[][][]
  ): LatLngTuple[][] => {
    // Adicionar verificação para garantir que geojsonCoords e seus elementos são válidos
    if (!geojsonCoords || geojsonCoords.length === 0) {
      console.warn(
        "geoJsonToLeafletLatLngs recebeu coordenadas GeoJSON vazias ou inválidas."
      );
      return [];
    }
    return geojsonCoords.map((ring) => {
      // Verifica se o anel é válido antes de mapear
      if (!ring || ring.length === 0) {
        return [];
      }
      return ring.map((coord) => {
        // Verifica se o par de coordenadas é válido e tem 2 elementos
        if (
          !coord ||
          coord.length < 2 ||
          typeof coord[0] !== "number" ||
          typeof coord[1] !== "number"
        ) {
          console.warn("Coordenada GeoJSON malformada encontrada:", coord);
          return [0, 0]; // Retorna um valor padrão ou lança um erro, dependendo da robustez desejada
        }
        return [coord[1], coord[0]] as LatLngTuple;
      });
    });
  };

  return (
    <MapContainerStyled>
      <MapContainer
        center={initialPosition}
        zoom={initialZoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedCity && incidenceData.length > 0 && (
          <Marker position={[incidenceData[0].lat, incidenceData[0].lon]}>
            <Popup>{selectedCity.nome}</Popup>
          </Marker>
        )}

        {incidenceData.map((data, index) => {
          // Adicionar verificação de segurança antes de renderizar Polygon
          // Garante que 'geometry' e 'coordinates' existem e têm o formato esperado
          if (
            data.geometry &&
            data.geometry.type === "Polygon" &&
            data.geometry.coordinates &&
            data.geometry.coordinates.length > 0 &&
            data.geometry.coordinates[0] &&
            data.geometry.coordinates[0].length > 0
          ) {
            return (
              <Polygon
                key={data.id || index} // Usar data.id se existir, senão index
                positions={
                  geoJsonToLeafletLatLngs(data.geometry.coordinates)[0]
                }
                pathOptions={{ color: "red", weight: 2, fillOpacity: 0.2 }}
              >
                <Popup>Irradiação Anual: {data.anual} kWh/m²</Popup>
              </Polygon>
            );
          }
          return null; // Não renderiza o polígono se os dados de geometria estiverem inválidos
        })}
      </MapContainer>
    </MapContainerStyled>
  );
};

export default MapComponent;
