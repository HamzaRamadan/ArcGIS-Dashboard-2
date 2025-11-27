/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import MapViewComponent from "./components/MapViewComponent";
import RightPanel from "./components/RightPanel";
import Topbar from "./components/Navbar";

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
    <div className="h-screen w-screen bg-gray-50">
      <Topbar
        brandLogo="/logo-ahda.svg"
        brandPrimary="#0b6e4f"
        brandAccent="#f2c94c"
        onZoomClick={() => mapView?.goTo(mapLayer?.fullExtent)}
      />

      <div className="flex h-[calc(100vh-64px)]">


        <div className="flex-1 relative">
          <MapViewComponent
            setChartData={setChartData}
            setView={setMapView}
            setLayer={setMapLayer}
          />
        </div>

        <div className="w-96 pr-6 pl-4 pt-6">
          <RightPanel chartData={chartData}  />
        </div>
      </div>
    </div>
  );
}
