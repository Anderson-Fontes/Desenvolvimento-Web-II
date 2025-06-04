// Tipagem para a geometria GeoJSON Polygon
export interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: number[][][];
}

// Tipagem para a cidade
export interface City {
  id: number;
  nome: string;
  geometry: GeoJSONPolygon;
}

// Tipagem para os dados de irradiação
export interface IncidenceData {
  id: number;
  lon: number;
  lat: number;
  anual: number;
  jan: number;
  fev: number;
  mar: number;
  abr: number;
  mai: number;
  jun: number;
  jul: number;
  ago: number;
  set: number;
  out: number;
  nov: number;
  dez: number;
  geometry: GeoJSONPolygon;
}