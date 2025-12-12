
//  Project Feature (Attributes of each project)
export interface ProjectFeature {
  Name: string;
  Type: number;
  Stage?: string;
  Class?: string;
  Year?: string | number;
  Size?: string | number;
  Notes?: string;
  population?: number;
  aging_index?: number;
  gdp_value?: number;
}

//  PopupCard Props
export interface PopupCardProps {
  selectedFeature: ProjectFeature;
  onClose: () => void;
}

//  FilterPanel Props
export interface FilterPanelProps {
  projectTypes: string[];
  searchText: string;
  setSearchText: (v: string) => void;
  applyFilter: (v: string) => void;
}

//  Chart Data Type (used in MapView)
export interface ChartData {
  population: number[];
  agingIndex: number[];
  gdp: number[];
}

//  ArcGIS Native Types

export type EsriMapView = __esri.MapView;
export type EsriFeatureLayer = __esri.FeatureLayer;
export type EsriGraphic = __esri.Graphic;
export type EsriHitTestResult = __esri.HitTestResult;

//  Custom simplified Graphic used in selection
export interface ArcGisGraphic {
  attributes: ProjectFeature;
  geometry?: __esri.Geometry;
}

//  MapViewComponent Props  
export interface MapViewComponentProps {
  setChartData: (data: ChartData) => void;
  setView: (view: EsriMapView) => void;
  setLayer: (layer: EsriFeatureLayer) => void;
}

export interface MapViewHitGraphic {
  type?: "graphic";
  graphic: __esri.Graphic;
}
