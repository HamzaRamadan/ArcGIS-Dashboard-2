import { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import "@arcgis/core/assets/esri/themes/light/main.css";

export default function SaudiMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // ✅ GeoJSON Layer
    const geojsonLayer = new GeoJSONLayer({
  url: "https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master/geojson/us-states.json",
      renderer: new SimpleRenderer({
        symbol: new SimpleFillSymbol({
          color: "#F3C89E", 
          outline: { color: "#ffffff", width: 1 },
        }),
      }),
      labelingInfo: [
        {
          labelExpressionInfo: { expression: "$feature.NAME_1" },
          symbol: {
            type: "text",
            color: "#6B2F00",
            haloColor: "#ffffff",
            haloSize: 1.5,
            font: { size: 13, weight: "bold" },
          },
        },
      ],
      popupEnabled: true,
    });

    const map = new Map({
      // basemap: "gray-vector",
      // basemap: "dark-gray-vector",
      basemap: "streets-navigation-vector",
      
      layers: [geojsonLayer],
    });

  const view = new MapView({
  container: mapRef.current,
  map,
  center: [-98, 39], 
  // center: [45, 23], 
  zoom: 4,         
  ui: { components: []},
});


    return () => view.destroy();
  }, []);

  return (
    <>
          <h1 className="text-2xl font-bold mb-6">This is Map 2</h1>
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-300 bg-white">
      <div ref={mapRef} className="w-full h-full " />
    </div>
    </>
  );
}
