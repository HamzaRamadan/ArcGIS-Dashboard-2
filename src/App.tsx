/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import Sidebar from "./components/Sidebar/Sidebar";
import DashboardContent from "./components/Dashboard/DashboardContent";
import ChartsContent from "./components/Charts/ChartsContent";
import ProjectsList from "./components/Projects/ProjectsList";
import ProjectPopup from "./components/Projects/ProjectPopup";
import MapViewComponent from "./components/Map/MapViewComponent";
import DevelopmentProjectsPage from "./components/DevelopmentProjects/DevelopmentProjectsPage";
import NationwideCharts from "./components/NationwideCharts/NationwideCharts";
import Navbar from "./components/Navbar";
import MapView from "@arcgis/core/views/MapView";

import type { Project, Nullable, Stats, NationwideData } from "./utils/types";

const FEATURE_LAYER_URL =
  "https://services1.arcgis.com/dEWY7aW7h9zHrSP9/arcgis/rest/services/Development_Projects/FeatureServer/0";

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [stats, setStats] = useState<Stats>({
    total: 0,
    completed: 0,
    underConstruction: 0,
    pending: 0,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<Nullable<Project>>(null);
  const [mapView, setMapView] = useState<Nullable<MapView>>(null);
  const [mapLayer, setMapLayer] = useState<Nullable<FeatureLayer>>(null);
  const [chartData, setChartData] = useState<Nullable<NationwideData>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Load data from ArcGIS FeatureLayer
  useEffect(() => {
    const layer = new FeatureLayer({ url: FEATURE_LAYER_URL });

    async function loadStats() {
      const queries = [
        layer.queryFeatureCount({ where: "1=1" }),
        layer.queryFeatureCount({ where: "Stage = 3" }),
        layer.queryFeatureCount({ where: "Stage = 2" }),
        layer.queryFeatureCount({ where: "Stage = 1" }),
      ];

      const [total, completed, underConstruction, pending] = await Promise.all(
        queries
      );
      setStats({ total, completed, underConstruction, pending });
    }

    async function loadProjects() {
      const res = await layer.queryFeatures({
        where: "1=1",
        outFields: ["*"],
        returnGeometry: false,
      });

      // تحويل القيم الرقمية لتتناسب مع type Project
      setProjects(
        res.features.map((f: any) => ({
          ...f.attributes,
          Year:
            f.attributes.Year !== undefined
              ? Number(f.attributes.Year)
              : undefined,
          Class:
            f.attributes.Class !== undefined
              ? Number(f.attributes.Class)
              : undefined,
          Stage:
            f.attributes.Stage !== undefined
              ? Number(f.attributes.Stage)
              : undefined,
          Type:
            f.attributes.Type !== undefined
              ? Number(f.attributes.Type)
              : undefined,
        }))
      );
    }

    loadStats();
    loadProjects();
  }, []);

  // Render page content based on activeTab
  const renderContent = () => {
    if (activeTab === "dashboard") return <DashboardContent stats={stats} />;
    if (activeTab === "charts")
      return (
        <ChartsContent stats={stats} mapView={mapView} mapLayer={mapLayer} />
      );
    if (activeTab === "DevelopmentProjects")
      return <DevelopmentProjectsPage mapView={mapView} mapLayer={mapLayer} />;
    if (activeTab === "NationwideCharts")
      return <NationwideCharts chartData={chartData} />;
    if (activeTab === "projects")
      return (
        <ProjectsList
          projects={projects}
          setSelectedProject={setSelectedProject}
        />
      );
    return (
      <div className="text-xl opacity-70 p-10">
        {activeTab} — Coming Soon...
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-[#0d1623] min-h-screen text-white overflow-hidden">
      {isLoading ? (
        <div
          className="h-screen w-screen flex flex-col items-center justify-center 
        bg-gradient-to-br from-[#0A2D37] to-[#080D18] text-white animate-fadeIn space-y-6"
        >
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
              } else {
                console.warn("Map not ready yet!");
              }
            }}
          />

          <div className="flex flex-1 overflow-hidden mt-0">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Page Content */}
            <div className="flex-1 p-4 lg:p-10 overflow-y-auto">
              {renderContent()}

              <div className="mt-10 bg-[#0a1320] rounded-xl h-[470px] border border-gray-800 overflow-hidden relative">
                <MapViewComponent
                  setChartData={setChartData}
                  setView={setMapView}
                  setLayer={setMapLayer}
                />
              </div>
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
