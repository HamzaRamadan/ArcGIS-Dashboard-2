/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartsContent({ stats, mapView, mapLayer }: any) {

  // Plugin for click
  const clickPlugin = {
    id: "clickHandler",
    afterEvent(chart: any, args: any) {
      const event = args.event;

      if (event.type !== "click") return;

      const points = chart.getElementsAtEventForMode(
        event.native,  
        "nearest",
        { intersect: true },
        false
      );

      if (points.length === 0) return;

      const index = points[0].index;

      let stageValue = 0;

      if (index === 0) stageValue = 3;         // Completed
      if (index === 1) stageValue = 2;         // Under construction
      if (index === 2) stageValue = 1;         // Pending

      // Zoom + highlight
      if (mapLayer && mapView) {
  mapLayer.queryFeatures({
    where: `Stage = ${stageValue}`,
    outFields: ["*"],
    returnGeometry: true
  }).then((res: any) => {
    if (res.features.length > 0) {

      const geom = res.features[0].geometry;

      mapView.goTo({
        center: geom,
        zoom: 12,
      });

    }
  });
}

    },
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">PROJECTS STATISTICS</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-[#132032] p-4 rounded-xl border border-gray-700 flex items-center justify-center">
          <div className="w-[220px] h-[220px] md:w-[260px] md:h-[260px]">
            <Pie
              data={{
                labels: ["Completed", "Under Const.", "Pending"],
                datasets: [
                  {
                    data: [
                      stats.completed,
                      stats.underConstruction,
                      stats.pending,
                    ],
                    backgroundColor: ["#0B6E4F", "#F2C94C", "#4FA9FF"],
                  },
                ],
              }}
              plugins={[clickPlugin]}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#fff",
                      font: { size: 12 },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
