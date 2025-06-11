// src/components/MapComponent.tsx
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L, { type PathOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { useCenso } from '../context/CensoContext';
import type { CensoPolygon } from '../services/censoService';

// Importar os tipos específicos do GeoJSON
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry, Position } from 'geojson';

// Ajuste para os ícones padrão do Leaflet, que podem não carregar corretamente no Webpack/Vite
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Estilização do container do mapa
const MapContainerStyled = styled(MapContainer)`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

// Componente auxiliar para centralizar o mapa
interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

function ChangeView({ center, zoom }: ChangeViewProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const MapComponent: React.FC = () => {
  const { censoData, selectedSector, fetchSectorDetails, loading } = useCenso();
  const geoJsonRef = useRef<L.GeoJSON>(null);

  // Função para converter WKT para GeoJSON
  const wktToGeoJSON = (wkt: string, cd_setor_prop: string): Feature => {
    if (wkt.startsWith('POLYGON')) {
      const coordsString = wkt.substring(wkt.indexOf('((') + 2, wkt.lastIndexOf('))'));
      const coordinates: Position[] = coordsString.split(',').map(pair => {
        const [x, y] = pair.trim().split(' ').map(Number);
        return [x, y];
      });
      return {
        type: 'Feature',
        properties: { cd_setor: cd_setor_prop }, // Incluindo cd_setor nas propriedades
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates],
        },
      };
    } else if (wkt.startsWith('MULTIPOLYGON')) {
      const cleanedWkt = wkt.substring(wkt.indexOf('(((') + 3, wkt.lastIndexOf(')))'));
      const polygonStrings = cleanedWkt.split(')),((');

      const multiPolygonCoordinates: Position[][][] = polygonStrings.map(polygonString => {
        const coordsPairStrings = polygonString.replace(/\(|\)/g, '').split(',');
        const coordinates: Position[] = coordsPairStrings.map(pair => {
            const [x, y] = pair.trim().split(' ').map(Number);
            return [x, y];
        });
        return [coordinates]; // Cada polígono tem pelo menos um anel (o limite externo)
      });

      return {
        type: 'Feature',
        properties: { cd_setor: cd_setor_prop }, // Incluindo cd_setor nas propriedades
        geometry: {
          type: 'MultiPolygon',
          coordinates: multiPolygonCoordinates,
        },
      };
    }
    // Caso de WKT não suportado (apenas para evitar erros de retorno)
    return {
      type: 'Feature',
      properties: { cd_setor: cd_setor_prop }, // Incluindo cd_setor nas propriedades
      geometry: {
        type: 'Point',
        coordinates: [],
      },
    };
  };

  // Função para estilizar os polígonos
  const style = (feature: Feature<Geometry, GeoJsonProperties> | undefined): PathOptions => {
    const featureCdSetor = feature?.properties?.cd_setor;
    const selectedCdSetor = selectedSector?.cd_setor;

    // A variável 'feature' é usada indiretamente através de 'feature?.properties'
    // Se o linter ainda reclamar, você pode adicionar a diretiva abaixo.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isSelected = selectedSector && featureCdSetor === selectedCdSetor;

    // console.log(`Estilizando setor: ${featureCdSetor || 'N/A'}. Setor selecionado (estado): ${selectedCdSetor || 'Nenhum'}. Comparação (${featureCdSetor} === ${selectedCdSetor}) = ${isSelected}`);


    return {
      fillColor: isSelected ? '#ff0000' : '#0000ff', // Vermelho para selecionado, azul para outros
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.5,
    };
  };

  // Lidar com o clique em um polígono
  const onEachFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    // A variável 'feature' é usada indiretamente através de 'feature.properties' na função style.
    // Se o linter ainda reclamar, você pode adicionar a diretiva abaixo.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    layer.on({
      click: (e) => {
        const { lat, lng } = e.latlng;
        // console.log("Coordenadas do clique (lng, lat):", lng, lat);
        // console.log("cd_setor do polígono clicado (antes de buscar detalhes):", feature.properties?.cd_setor);
        fetchSectorDetails(lng, lat);
        L.DomEvent.stopPropagation(e);
      },
    });
  };

  // Efeito para redefinir o estilo GeoJSON quando censoData ou selectedSector mudam
  useEffect(() => {
    if (geoJsonRef.current && censoData) {
      geoJsonRef.current.clearLayers();
      // Passa p.cd_setor para wktToGeoJSON
      const features: Feature[] = censoData.polygons.map((p: CensoPolygon) => wktToGeoJSON(p.geom, p.cd_setor));
      const newGeoJsonData: FeatureCollection = { type: 'FeatureCollection', features: features };
      geoJsonRef.current.addData(newGeoJsonData);
    }
  }, [censoData, selectedSector]); // selectedSector como dependência para forçar atualização

  if (loading && !censoData) {
    return <p>Carregando mapa...</p>;
  }

  if (!censoData) {
    return <p>Selecione uma cidade para visualizar o mapa.</p>;
  }

  // Coordenadas iniciais e zoom (pode ser ajustado)
  const initialCenter: [number, number] = censoData.centroid ? [censoData.centroid.latitude, censoData.centroid.longitude] : [-23.2847, -45.9615];
  const initialZoom = 12;

  // Converte os polígonos WKT para o formato GeoJSON que o react-leaflet entende
  // Passa p.cd_setor para wktToGeoJSON
  const geoJsonFeatures: Feature[] = censoData.polygons.map((p: CensoPolygon) => wktToGeoJSON(p.geom, p.cd_setor));
  const geoJsonData: FeatureCollection = {
    type: 'FeatureCollection',
    features: geoJsonFeatures,
  };

  return (
    <MapContainerStyled center={initialCenter} zoom={initialZoom} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {censoData.centroid && (
        <ChangeView center={[censoData.centroid.latitude, censoData.centroid.longitude]} zoom={initialZoom} />
      )}
      <GeoJSON
        // Chave combinada para forçar a re-renderização quando a cidade ou o setor selecionado mudam
        key={`${censoData.centroid.latitude}-${censoData.centroid.longitude}-${selectedSector?.cd_setor || ''}`}
        data={geoJsonData}
        style={style}
        onEachFeature={onEachFeature}
        ref={geoJsonRef}
      />
    </MapContainerStyled>
  );
};

export default MapComponent;