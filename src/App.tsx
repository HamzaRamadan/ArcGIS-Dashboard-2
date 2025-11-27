
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import MapViewComponent from "./components/MapViewComponent";
import RightPanel from "./components/RightPanel";
import Topbar from "./components/Navbar";
import NationwideCharts from "./components/NationwideCharts";

export default function App() {
  const [mapView, setMapView] = useState<any>(null);
  const [mapLayer, setMapLayer] = useState<any>(null);

  const [chartData, setChartData] = useState<{
    population: number[];
    agingIndex: number[];
    gdp: number[];
  }>({
    population: [],
    agingIndex: [],
    gdp: [],
  });


  return (
    <>
      <div className="h-screen w-screen bg-gray-50 overflow-x-hidden">

        <Topbar
          brandLogo="/logo-ahda.svg"
          brandPrimary="#0b6e4f"
          brandAccent="#f2c94c"
          onZoomClick={() => mapView?.goTo(mapLayer?.fullExtent)}
        />

        {/* GRID SYSTEM – افضل من flex للشاشات المتوسطة */}
        <div className="
          grid 
          grid-cols-1 
          lg:grid-cols-[1fr_380px] 
          h-auto 
          lg:h-[calc(100vh-64px)]
          overflow-x-hidden
        ">
          
          {/* ====== LEFT SIDE (MAP + CHARTS) ====== */}
          <div className="flex flex-col w-full overflow-hidden">

            {/* MAP */}
            <div className="flex-1 relative w-full">
              <MapViewComponent
                setChartData={setChartData}
                setView={setMapView}
                setLayer={setMapLayer}
              />
            </div>

            {/* CHARTS – يظهر تحت الخريطة في الشاشات الصغيرة فقط */}
            <div className="block lg:hidden p-4 mt-4 bg-white shadow rounded-b-lg overflow-auto">
              <NationwideCharts chartData={chartData} />
            </div>

          </div>

          {/* ====== RIGHT PANEL ====== */}
          <div className="p-4 lg:pt-6 lg:pr-6">
            <RightPanel />
          </div>

        </div>

      </div>

      {/* CHARTS – يظهر في الشاشات الكبيرة فقط */}
      <div className="hidden lg:block p-4 mt-8 bg-white shadow rounded-b-lg overflow-auto">
        <NationwideCharts chartData={chartData} />
      </div>
    </>
  );
}
