/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Search, Filter } from "lucide-react";

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

declare global {
  interface Window {
    _projectsLayer: any;
  }
}

const typeMapping: Record<number, string> = {
  1: "Commercial",
  2: "Industrial",
  3: "Residential",
  4: "Airport",
  5: "Other",
  6: "Land Division",
};

const MapViewComponent: React.FC<MapProps> = ({
  setChartData,
  setView,
  setLayer,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [, setPopupPosition] = useState<{ x: number; y: number } | null>(null);

  const [projectTypes, setProjectTypes] = useState<string[]>([]);

  const applyFilter = (value: string) => {
    if (!window._projectsLayer) return;

    if (value === "ALL") {
      window._projectsLayer.definitionExpression = "1=1";
    } else {
      const numValue = Number(
        Object.keys(typeMapping).find(
          (key) => typeMapping[parseInt(key)] === value
        )
      );
      if (numValue) {
        window._projectsLayer.definitionExpression = `Type = ${numValue}`;
      }
    }
  };

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
        featureReduction: { type: "cluster", clusterRadius: "70px" },
      });

      map.add(projectsLayer);

      viewObj = new MapView({
        container: mapRef.current as any,
        map,
        zoom: 7,
        center: [49.6, 25.4],
        popupEnabled: false,
      });

      setView(viewObj);
      setLayer(projectsLayer);
      (window as any)._projectsLayer = projectsLayer;

      // Auto zoom
      const layerExtent = await projectsLayer.queryExtent();
      if (layerExtent?.extent) {
        try {
          await viewObj.goTo(layerExtent.extent);
        } catch {
          /* empty */
        }
      }

      // Fetch chart data
      const res = await projectsLayer.queryFeatures({
        where: "1=1",
        outFields: ["*"],
        returnGeometry: false,
      });
      const features = res.features.map((f: any) => f.attributes);

      // Set project types dynamically
      const types = Array.from(
        new Set(features.map((f: any) => typeMapping[f.Type]).filter(Boolean))
      );
      setProjectTypes(types);

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

      // Click event → open overlay card
      viewObj.when(() => {
        viewObj.on("click", async (event: any) => {
          const hitTestResult = await viewObj.hitTest(event);
          const graphic = hitTestResult.results.find(
            (r: any) => r.graphic.layer === projectsLayer
          )?.graphic;

          if (graphic) {
            const attr = graphic.attributes;
            const screenPoint = viewObj.toScreen(event.mapPoint);
            setPopupPosition({ x: screenPoint.x, y: screenPoint.y });
            setSelectedFeature(attr);
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
  }, []);

  // Search

  const [searchText, setSearchText] = useState("");

  // Watch searchText and apply filter to layer
  useEffect(() => {
    if (!window._projectsLayer) return;

    let whereClause = "1=1";

    if (searchText.trim()) {
      // Escape single quotes
      const searchEscaped = searchText.replace(/'/g, "''");
      whereClause += ` AND Name LIKE '%${searchEscaped}%'`;
    }

    window._projectsLayer.definitionExpression = whereClause;
  }, [searchText]);

  return (
    <section className="w-full h-full relative rounded-xl shadow bg-white overflow-hidden">
      {/* Floating Filter And Search*/}

      <div className="absolute top-4 left-4 z-50 w-40 sm:w-48 md:w-56">
        <div
          className="backdrop-blur-xl bg-white/90 border border-gray-200 shadow-2xl 
                  rounded-2xl px-3 py-3 sm:px-4 sm:py-4 flex flex-col gap-2 sm:gap-3"
        >
          {/* عنوان الفلتر */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <h4 className="text-xs sm:text-sm font-semibold text-gray-700">
              Filter by Type
            </h4>
          </div>

          {/* Dropdown الفلتر */}
          <div className="relative">
            <select
              className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg bg-[#111c2b] 
                   focus:ring-2 focus:ring-blue-500 appearance-none pr-7 sm:pr-8 cursor-pointer"
              onChange={(e) => applyFilter(e.target.value)}
            >
              <option value="ALL">All Types</option>
              {projectTypes.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs sm:text-base">
              ▼
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by project name..."
              className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg bg-[#111c2b]
                   focus:ring-2 focus:ring-blue-500 pl-8 sm:pl-10"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Search className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Map */}
      <div ref={mapRef} className="w-full h-[50vh] md:h-[70vh] lg:h-[80vh]" />

      {/* Loading Screen */}
      {/* Sniper Spinner Loading */}
      {!mapReady && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white/30 backdrop-blur-lg p-6">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-r-transparent rounded-full animate-spin"></div>

          {/* Text */}
          <div className="text-gray-700 text-lg font-medium mt-4">
            Loading map ...
          </div>
        </div>
      )}

      {/* Modern Popup */}
      {selectedFeature && (
        <div
          className="absolute z-50 w-[320px] sm:w-[400px] max-w-[90%] 
               rounded-2xl overflow-hidden shadow-2xl 
               animate-[popupShow_0.25s_ease-out]
               backdrop-blur-2xl bg-gradient-to-r from-[#080D18] to-[#0F1A2B] border border-white/50"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-r from-[#080D18] to-[#0F1A2B] text-white px-4 py-3">
            <h3 className="text-lg font-bold truncate">
              {selectedFeature.Name || "Project Name"}
            </h3>

            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-2 right-2 bg-white/30 hover:bg-white/40 
                   transition rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Body with two-column layout */}
          <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="grid grid-cols-2 gap-2">
              {[
                [
                  "Type",
                  typeMapping[selectedFeature.Type] || selectedFeature.Type,
                  "🗂️",
                ],
                ["Stage", selectedFeature.Stage, "🚧"],
                ["Premises", selectedFeature.Class, "🏢"],
                ["Year", selectedFeature.Year, "📅"],
                ["Project Size", selectedFeature.Size, "📏"],
                ["Notes", selectedFeature.Notes, "📝"],
              ].map(([label, value, icon], i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 bg-[#132032] backdrop-blur-md 
                       px-3 py-2 rounded-lg border border-[#0F1A2B] hover:bg-[#0F1A2B] transition text-sm"
                >
                  <span className="text-xl">{icon}</span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#fff]">{label}</span>
                    <span className="text-[#fff] font-medium truncate max-w-[120px]">
                      {value || "-"}
                    </span>
                  </div>
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
