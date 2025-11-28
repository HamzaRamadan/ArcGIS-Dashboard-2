// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from "react";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

// import Sidebar from "./components/Sidebar/Sidebar";
// import DashboardContent from "./components/Dashboard/DashboardContent";
// import ChartsContent from "./components/Charts/ChartsContent";
// import ProjectsList from "./components/Projects/ProjectsList";
// import ProjectPopup from "./components/Projects/ProjectPopup";
// import MapViewComponent from "./components/MapViewComponent";
// import DevelopmentProjectsPage from "./components/DevelopmentProjects/DevelopmentProjectsPage";
// import NationwideCharts from "./components/NationwideCharts/NationwideCharts";

// const FEATURE_LAYER_URL =
//   "https://services1.arcgis.com/dEWY7aW7h9zHrSP9/arcgis/rest/services/Development_Projects/FeatureServer/0";

// export default function App() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [stats, setStats] = useState({
//     total: 0,
//     completed: 0,
//     underConstruction: 0,
//     pending: 0,
//   });

//   const [projects, setProjects] = useState<any[]>([]);
//   const [selectedProject, setSelectedProject] = useState<any | null>(null);

//   const [, setMapView] = useState<any>(null);
//   const [, setMapLayer] = useState<any>(null);
//   const [chartData, setChartData] = useState<any>(null);

//   // Load data
//   useEffect(() => {
//     const layer = new FeatureLayer({ url: FEATURE_LAYER_URL });

//     async function loadStats() {
//       const total = await layer.queryFeatureCount({ where: "1=1" });
//       const completed = await layer.queryFeatureCount({ where: "Stage = 3" });
//       const underConstruction = await layer.queryFeatureCount({
//         where: "Stage = 2",
//       });
//       const pending = await layer.queryFeatureCount({ where: "Stage = 1" });

//       setStats({ total, completed, underConstruction, pending });
//     }

//     async function loadProjects() {
//       const res = await layer.queryFeatures({
//         where: "1=1",
//         outFields: ["*"],
//         returnGeometry: false,
//       });
//       setProjects(res.features.map((f: any) => f.attributes));
//     }

//     loadStats();
//     loadProjects();
//   }, []);

//   const renderContent = () => {
//     if (activeTab === "dashboard") return <DashboardContent stats={stats} />;
//     if (activeTab === "charts") return <ChartsContent stats={stats} />;
//     if (activeTab === "DevelopmentProjects") return <DevelopmentProjectsPage  />;
//     if (activeTab === "NationwideCharts") return <NationwideCharts chartData={chartData}   />;
//     if (activeTab === "projects")
//       return (
//         <ProjectsList
//           projects={projects}
//           setSelectedProject={setSelectedProject}
//         />
//       );

//     return (
//       <div className="text-xl opacity-70 p-10">{activeTab} — Coming Soon...</div>
//     );
//   };

//   return (
    
//     <div className="flex bg-[#0d1623] min-h-screen text-white overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* Page Content */}
//       <div className="flex-1 p-4 lg:p-10 overflow-y-auto mt-14 lg:mt-0">
//         {renderContent()}

//         <div className="mt-10 bg-[#0a1320] rounded-xl h-[470px] border border-gray-800 overflow-hidden relative">
//           <MapViewComponent
//             setChartData={setChartData}
//             setView={setMapView}
//             setLayer={setMapLayer}
//           />
//         </div>
//       </div>

//       {/* Popup */}
//       {selectedProject && (
//         <ProjectPopup
//           project={selectedProject}
//           onClose={() => setSelectedProject(null)}
//         />
//       )}
//     </div>
//   );
// }










/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import Sidebar from "./components/Sidebar/Sidebar";
import DashboardContent from "./components/Dashboard/DashboardContent";
import ChartsContent from "./components/Charts/ChartsContent";
import ProjectsList from "./components/Projects/ProjectsList";
import ProjectPopup from "./components/Projects/ProjectPopup";
import MapViewComponent from "./components/MapViewComponent";
import DevelopmentProjectsPage from "./components/DevelopmentProjects/DevelopmentProjectsPage";
import NationwideCharts from "./components/NationwideCharts/NationwideCharts";
import Navbar from "./components/Navbar";

const FEATURE_LAYER_URL =
  "https://services1.arcgis.com/dEWY7aW7h9zHrSP9/arcgis/rest/services/Development_Projects/FeatureServer/0";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    underConstruction: 0,
    pending: 0,
  });

  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);


  const [mapView, setMapView] = useState<any>(null);
const [mapLayer, setMapLayer] = useState<any>(null);

  const [chartData, setChartData] = useState<any>(null);

  // Load data
  useEffect(() => {
    const layer = new FeatureLayer({ url: FEATURE_LAYER_URL });

    async function loadStats() {
      const total = await layer.queryFeatureCount({ where: "1=1" });
      const completed = await layer.queryFeatureCount({ where: "Stage = 3" });
      const underConstruction = await layer.queryFeatureCount({ where: "Stage = 2" });
      const pending = await layer.queryFeatureCount({ where: "Stage = 1" });
      setStats({ total, completed, underConstruction, pending });
    }

    async function loadProjects() {
      const res = await layer.queryFeatures({ where: "1=1", outFields: ["*"], returnGeometry: false });
      setProjects(res.features.map((f: any) => f.attributes));
    }

    loadStats();
    loadProjects();
  }, []);

  const renderContent = () => {
    if (activeTab === "dashboard") return <DashboardContent stats={stats} />;
    if (activeTab === "charts") return <ChartsContent stats={stats} />;
    if (activeTab === "DevelopmentProjects") return <DevelopmentProjectsPage />;
    if (activeTab === "NationwideCharts") return <NationwideCharts chartData={chartData} />;
    if (activeTab === "projects")
      return <ProjectsList projects={projects} setSelectedProject={setSelectedProject} />;

    return <div className="text-xl opacity-70 p-10">{activeTab} — Coming Soon...</div>;
  };

  return (
    <div className="flex flex-col bg-[#0d1623] min-h-screen text-white overflow-hidden">
      {/* Navbar */}
      {/* <Navbar
        brandLogo="/logo-ahda.svg"       
        brandPrimary="#0a2d37"
        brandAccent="#F2C94C"
        onZoomClick={() => {
          console.log("Zoom to Layer clicked");
        }}
      /> */}
<Navbar
  brandLogo="/logo-ahda.svg"
  brandPrimary="#0a2d37"
  brandAccent="#F2C94C"
  onZoomClick={() => {
    if (mapView && mapLayer) {
      // لو الـ fullExtent موجود
      if (mapLayer.fullExtent) {
        mapView.goTo(mapLayer.fullExtent);
      } else {
        // لو مش موجود، جرب queryExtent
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
            <MapViewComponent setChartData={setChartData} setView={setMapView} setLayer={setMapLayer} />
          </div>
        </div>

        {/* Popup */}
        {selectedProject && (
          <ProjectPopup project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </div>
  );
}
