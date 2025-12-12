import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartEvent } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useRef } from "react";
import  MapView  from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import FeatureLayerView from "@arcgis/core/views/layers/FeatureLayerView";

ChartJS.register(ArcElement, Tooltip, Legend);

// نوع البيانات للإحصائيات
interface Stats {
  completed: number;
  underConstruction: number;
  pending: number;
}

interface ChartsContentProps {
  stats: Stats;
  mapView: MapView | null;
  mapLayer: FeatureLayer | null;
}

export default function ChartsContent({
  stats,
  mapView,
  mapLayer,
}: ChartsContentProps) {
  const highlightRef = useRef<__esri.Handle | null>(null); 

 const clickPlugin = {
  id: "clickHandler",
  afterEvent(chart: ChartJS, args: { event: ChartEvent }) {
    const event = args.event;

    if (event.type !== "click") return;

    const nativeEvent = event.native;
    if (!nativeEvent) return; // ✅ التأكد من أنه مش null

    const points = chart.getElementsAtEventForMode(
      nativeEvent,
      "nearest",
      { intersect: true },
      false
    );

    if (points.length === 0) return;

    const index = points[0].index;

    const stageValue = index === 0 ? 3 : index === 1 ? 2 : 1;

    if (!mapLayer || !mapView) return;

    mapLayer.queryFeatures({
      where: `Stage = ${stageValue}`,
      outFields: ["*"],
      returnGeometry: true,
    }).then((res) => {
      if (res.features.length === 0) return;

      const geom = res.features[0].geometry;

      // ========== ZOOM ==========
      mapView.goTo({
        center: geom,
        zoom: 12,
      });

      // ========== HIGHLIGHT ==========
      mapView.whenLayerView(mapLayer).then((layerView: FeatureLayerView) => {
        if (highlightRef.current) highlightRef.current.remove();
        highlightRef.current = layerView.highlight(res.features);
      });
    });
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
                    data: [stats.completed, stats.underConstruction, stats.pending],
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
