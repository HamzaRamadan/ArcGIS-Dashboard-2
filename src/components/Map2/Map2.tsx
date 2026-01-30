import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import ColorVariable from "@arcgis/core/renderers/visualVariables/ColorVariable";

const Map2: React.FC = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mapDiv.current) return;

    const map = new Map({
      basemap: "streets-navigation-vector",
    });

    const colorVariable = new ColorVariable({
      field: "OBJECTID",
      stops: [
        { value: 1, color: "#ff6b6b" },
        { value: 5, color: "#feca57" },
        { value: 10, color: "#48dbfb" },
        { value: 20, color: "#1dd1a1" },
        { value: 30, color: "#5f27cd" },
      ],
    });

    const renderer = new SimpleRenderer({
      symbol: new SimpleFillSymbol({
        outline: {
          color: [255, 255, 255, 0.9],
          width: 1,
        },
      }),
      visualVariables: [colorVariable],
    });

    const featureLayer = new FeatureLayer({
      url: "https://egis.tbc.sa/server/rest/services/TBC_Basemap_EN/MapServer/15",
      outFields: ["*"],
      renderer,
    });

    map.add(featureLayer);

    const view = new MapView({
      container: mapDiv.current,
      map,
      center: [45.0792, 23.8859],
      zoom: 6,
    });

    view.when(() => setLoading(false));

    return () => view.destroy();
  }, []);

  return (
    <>
    <h1 className="text-xl font-bold py-3">This is Map 2</h1>
    <div className="relative w-full h-[80vh] rounded-xl overflow-hidden border border-gray-800">
      <div ref={mapDiv} className="w-full h-full" />

      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-white/50 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-r-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading map...</p>
        </div>
      )}
    </div>
    </>
  );
};

export default Map2;
