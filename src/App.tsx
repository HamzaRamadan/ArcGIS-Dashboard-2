/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";

import Sidebar from "./components/Sidebar/Sidebar";
import DashboardContent from "./components/Dashboard/DashboardContent";
import ChartsContent from "./components/Charts/ChartsContent";
import ProjectsList from "./components/Projects/ProjectsList";
import ProjectPopup from "./components/Projects/ProjectPopup";
import MapViewComponent from "./components/Map/MapViewComponent";
import DevelopmentProjectsPage from "./components/DevelopmentProjects/DevelopmentProjectsPage";
import NationwideCharts from "./components/NationwideCharts/NationwideCharts";
import Navbar from "./components/Navbar";

import type { Project, Nullable, Stats, NationwideData } from "./utils/types";
import { FeatureLayerProvider, useFeatureLayer } from "./context/FeatureLayerContext";
import Map2 from "./components/Map2/Map2";

export function MainApp() {
  const FEATURE_LAYER_URL = useFeatureLayer();
const location = useLocation();


  const [stats, setStats] = useState<Stats>({
    total: 0,
    completed: 0,
    underConstruction: 0,
    pending: 0,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Nullable<Project>>(null);
  const [mapView, setMapView] = useState<Nullable<MapView>>(null);
  const [mapLayer, setMapLayer] = useState<Nullable<FeatureLayer>>(null);
  const [chartData, setChartData] = useState<Nullable<NationwideData>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Load data
  useEffect(() => {
    const layer = new FeatureLayer({ url: FEATURE_LAYER_URL });

    async function loadStats() {
      const [total, completed, underConstruction, pending] = await Promise.all([
        layer.queryFeatureCount({ where: "1=1" }),
        layer.queryFeatureCount({ where: "Stage = 3" }),
        layer.queryFeatureCount({ where: "Stage = 2" }),
        layer.queryFeatureCount({ where: "Stage = 1" }),
      ]);

      setStats({ total, completed, underConstruction, pending });
    }

    async function loadProjects() {
      const res = await layer.queryFeatures({
        where: "1=1",
        outFields: ["*"],
        returnGeometry: false,
      });

      setProjects(
        res.features.map((f: any) => ({
          ...f.attributes,
          Year: f.attributes.Year !== undefined ? Number(f.attributes.Year) : undefined,
          Class: f.attributes.Class !== undefined ? Number(f.attributes.Class) : undefined,
          Stage: f.attributes.Stage !== undefined ? Number(f.attributes.Stage) : undefined,
          Type: f.attributes.Type !== undefined ? Number(f.attributes.Type) : undefined,
        }))
      );
    }

    loadStats();
    loadProjects();
  }, [FEATURE_LAYER_URL]);

  return (
    <div className="flex flex-col bg-[#0d1623] min-h-screen text-white overflow-hidden">
      {isLoading ? (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0A2D37] to-[#080D18] text-white animate-fadeIn space-y-6">
          <div className="flex space-x-4">
            <div className="w-5 h-5 bg-white rounded-full animate-bounce"></div>
            <div className="w-5 h-5 bg-white rounded-full animate-bounce delay-150"></div>
            <div className="w-5 h-5 bg-white rounded-full animate-bounce delay-300"></div>
          </div>
          <p className="text-xl md:text-4xl font-semibold opacity-90 tracking-wide">
            Loading...
          </p>
        </div>
      ) : (
        <>
          {/* Navbar */}
          <Navbar
            brandLogo="/logo-ahda.svg"
            brandPrimary="#0a2d37"
            brandAccent="#F2C94C"
            onZoomClick={() => {
              if (mapView && mapLayer) {
                if (mapLayer.fullExtent) {
                  mapView.goTo(mapLayer.fullExtent);
                } else {
                  mapLayer.queryExtent().then((res: any) => {
                    if (res.extent) mapView.goTo(res.extent);
                  });
                }
              }
            }}
          />

          <div className="flex flex-1 overflow-hidden mt-0">
            {/* Sidebar (لسه شغال بالـ state) */}
            <Sidebar  />

            {/* Page Content */}
            <div className="flex-1 p-4 lg:p-10 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />

                <Route
                  path="/dashboard"
                  element={<DashboardContent stats={stats} />}
                />

                <Route
                  path="/charts"
                  element={
                    <ChartsContent
                      stats={stats}
                      mapView={mapView}
                      mapLayer={mapLayer}
                    />
                  }
                />

                <Route
                  path="/development-projects"
                  element={
                    <DevelopmentProjectsPage
                      mapView={mapView}
                      mapLayer={mapLayer}
                    />
                  }
                />

                <Route
                  path="/nationwide-charts"
                  element={<NationwideCharts chartData={chartData} />}
                />

                <Route
                  path="/projects"
                  element={
                    <ProjectsList
                      projects={projects}
                      setSelectedProject={setSelectedProject}
                    />
                  }
                />

                <Route
                  path="/map2"
                  element={
                    <Map2
                    />
                  }
                />
              </Routes>

              {/* الخريطة ثابتة */}
             {location.pathname !== "/map2" && (
  <div className="mt-10 bg-[#0a1320] rounded-xl h-[470px] border border-gray-800 overflow-hidden relative">
    <MapViewComponent
      setChartData={setChartData}
      setView={setMapView}
      setLayer={setMapLayer}
    />
  </div>
)}

            </div>

            {/* Popup */}
            {selectedProject && (
              <ProjectPopup
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <FeatureLayerProvider>
      <MainApp />
    </FeatureLayerProvider>
  );
}
