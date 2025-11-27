/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";

const FEATURE_LAYER_URL =
  "https://services1.arcgis.com/dEWY7aW7h9zHrSP9/arcgis/rest/services/Development_Projects/FeatureServer/0";

interface MapProps {
  setChartData: (data: {
    population: number[];
    agingIndex: number[];
    gdp: number[];
  }) => void;
  setView: (view: any) => void;
  setLayer: (layer: any) => void;
}

const MapViewComponent: React.FC<MapProps> = ({
  setChartData,
  setView,
  setLayer,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    let viewObj: any = null;

    (async () => {
      const [Map, MapView, FeatureLayer] = await Promise.all([
        (await import("@arcgis/core/Map")).default,
        (await import("@arcgis/core/views/MapView")).default,
        (await import("@arcgis/core/layers/FeatureLayer")).default,
      ]);

      const map = new Map({ basemap: "streets-navigation-vector" });

    const projectsLayer = new FeatureLayer({
  url: FEATURE_LAYER_URL,
  outFields: ["*"],
  title: "Development Projects",

  //  Enable clustering
  featureReduction: {
    type: "cluster",
    clusterRadius: "80px",
    labelingInfo: [
      {
        
        labelPlacement: "center-center",
      },
    ],
  },
});


      map.add(projectsLayer);

      viewObj = new MapView({
        container: mapRef.current as any,
        map,
        zoom: 8,
        center: [49.6, 25.4],
      });

      setView(viewObj);
      setLayer(projectsLayer);

      // Auto zoom to layer
      const layerExtent = await projectsLayer.queryExtent();
      if (layerExtent?.extent) {
        try {
          await viewObj.goTo(layerExtent.extent);
        } catch (err) {
          console.warn("goTo skipped:", err);
        }
      }

      // Fetch data for charts
      const res = await projectsLayer.queryFeatures({
        where: "1=1",
        outFields: ["*"],
        returnGeometry: false,
      });

      const features = res.features.map((f: any) => f.attributes);

      const population = features.map(
        (f) => f.population || Math.random() * 90000000
      );
      const agingIndex = features.map(
        (f) => f.aging_index || Math.random() * 60
      );
      const gdp = features.map((f) => f.gdp_value || Math.random() * 100000);

      setChartData({
        population: population.slice(0, 5),
        agingIndex: agingIndex.slice(0, 5),
        gdp: gdp.slice(0, 5),
      });

      //  Click event for modern overlay card
      viewObj.when(() => {
        viewObj.on("click", async (event: any) => {
          const hitTestResult = await viewObj.hitTest(event);

          if (hitTestResult.results.length > 0) {
            const graphic = hitTestResult.results.find(
              (r: any) => r.graphic.layer === projectsLayer
            )?.graphic;

            if (graphic) {
              const attr = graphic.attributes;
              console.log("Feature Attributes:", attr);

              const screenPoint = viewObj.toScreen(event.mapPoint);
              setPopupPosition({ x: screenPoint.x, y: screenPoint.y });
              setSelectedFeature(attr);
            } else {
              setSelectedFeature(null);
            }
          } else {
            setSelectedFeature(null);
          }
        });
      });

      setMapReady(true);
    })();

    return () => {
      if (viewObj) viewObj.container = null;
    };
  }, [setChartData, setView, setLayer]);

  return (
    <section className="w-full h-full bg-white rounded-lg shadow overflow-hidden relative">
      <div ref={mapRef} className="w-full h-[50vh] lg:h-[90vh]" />

      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10 text-lg font-semibold">
         Loading map...
        </div>
      )}

      {/* Modern Overlay Card */}
     {selectedFeature && (
  <div
    className="absolute z-50 pointer-events-auto bg-white rounded-2xl shadow-2xl border border-gray-200 animate-fadeIn"
    style={{
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "360px",
    }}
  >
    {/* Close Button */}
    <button
      onClick={() => setSelectedFeature(null)}
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
    >
      ✕
    </button>

    {/* Header */}
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-5 py-4 border-b border-gray-200 rounded-t-2xl">
      <h3 className="text-xl font-semibold text-center text-gray-800">
        {selectedFeature.Name || "Project Name"}
      </h3>
    </div>

    {/* Table Layout */}
    <div className="p-5">
      <div className="space-y-3">
        {[
          ["Project Name", selectedFeature.Name],
          ["Type", selectedFeature.Type],
          ["Stage of Development", selectedFeature.Stage],
          ["Premises", selectedFeature.Class],
          ["Year", selectedFeature.Year],
          ["Project Size", selectedFeature.Size],
          ["Notes", selectedFeature.Notes],
        ].map(([label, value], idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg shadow-sm"
          >
            <span className="font-semibold text-gray-600">{label}</span>
            <span className="text-gray-800">{value || "-"}</span>
          </div>
        ))}

    
      </div>
    </div>
  </div>
)}

    </section>
  );
};

export default MapViewComponent;
