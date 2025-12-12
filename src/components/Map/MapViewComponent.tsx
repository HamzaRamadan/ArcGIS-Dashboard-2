/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import FilterPanel from "./FilterPanel";
import PopupCard from "./PopupCard";
import { typeMapping } from "../../utils/typeMapping";
import { useFeatureLayer } from "../../context/FeatureLayerContext";

import type { ProjectFeature, MapViewComponentProps } from "../../utils/mapview";

declare global {
  interface Window {
    _projectsLayer: __esri.FeatureLayer;
  }
}

const MapViewComponent: React.FC<MapViewComponentProps> = ({ setChartData, setView, setLayer }) => {
  const FEATURE_LAYER_URL = useFeatureLayer();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<ProjectFeature | null>(null);
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const applyFilter = (value: string) => {
    if (!window._projectsLayer) return;
    if (value === "ALL") {
      window._projectsLayer.definitionExpression = "1=1";
      return;
    }
    const numValue = Number(Object.keys(typeMapping).find((key) => typeMapping[parseInt(key)] === value));
    if (numValue) window._projectsLayer.definitionExpression = `Type = ${numValue}`;
  };

  useEffect(() => {
    let viewObj: __esri.MapView | null = null;

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

      const container = mapRef.current;
      if (!container) return;

      viewObj = new MapView({ container, map, zoom: 10, popupEnabled: false });

      setView(viewObj);
      setLayer(projectsLayer);
      window._projectsLayer = projectsLayer;

      const layerExtent = await projectsLayer.queryExtent();
      viewObj.when(async () => {
        if (layerExtent?.extent) await viewObj!.goTo({ target: layerExtent.extent, zoom: viewObj!.zoom });
      });

      const res = await projectsLayer.queryFeatures({ where: "1=1", outFields: ["*"], returnGeometry: false });
      const features = res.features.map((f) => f.attributes);
      const types = Array.from(new Set(features.map((f) => typeMapping[f.Type]).filter(Boolean)));
      setProjectTypes(types);

      setChartData({
        population: features.map((f) => f.population || Math.random() * 90000000).slice(0, 5),
        agingIndex: features.map((f) => f.aging_index || Math.random() * 60).slice(0, 5),
        gdp: features.map((f) => f.gdp_value || Math.random() * 100000).slice(0, 5),
      });

      viewObj.on("click", async (event) => {
        const hit = await viewObj!.hitTest(event);
        const graphicHit = hit.results.find(
          (r): r is __esri.MapViewGraphicHit => (r as __esri.MapViewGraphicHit).graphic?.layer === projectsLayer
        );
        if (graphicHit) setSelectedFeature(graphicHit.graphic.attributes as ProjectFeature);
        else setSelectedFeature(null);
      });

      viewObj.on("pointer-move", async (event) => {
        const hit = await viewObj!.hitTest(event);
        const over = hit.results.some(
          (r): r is __esri.MapViewGraphicHit => (r as __esri.MapViewGraphicHit).graphic?.layer === projectsLayer
        );
        if (viewObj?.container) viewObj.container.style.cursor = over ? "pointer" : "default";
      });

      setMapReady(true);
    })();

    return () => {
      if (viewObj) {
        viewObj.container = null;
        viewObj.destroy();
      }
    };
  }, [FEATURE_LAYER_URL]);

  useEffect(() => {
    if (!window._projectsLayer) return;
    let where = "1=1";
    if (searchText.trim()) where += ` AND Name LIKE '%${searchText.replace(/'/g, "''")}%'`;
    window._projectsLayer.definitionExpression = where;
  }, [searchText]);

  return (
    <section className="w-full h-full relative rounded-xl shadow bg-white overflow-hidden">
      <FilterPanel projectTypes={projectTypes} searchText={searchText} setSearchText={setSearchText} applyFilter={applyFilter} />
      <div ref={mapRef} className="w-full h-[50vh] md:h-[70vh] lg:h-[80vh]" />
      {!mapReady && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white/30 backdrop-blur-lg p-6">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-r-transparent rounded-full animate-spin"></div>
          <div className="text-gray-700 text-lg font-medium mt-4">Loading map ...</div>
        </div>
      )}
      {selectedFeature && <PopupCard selectedFeature={selectedFeature} onClose={() => setSelectedFeature(null)} />}
    </section>
  );
};

export default MapViewComponent;
