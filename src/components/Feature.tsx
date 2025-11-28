// import { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

// const FEATURE_LAYER_URL =
//   "https://services1.arcgis.com/dEWY7aW7h9zHrSP9/arcgis/rest/services/Development_Projects/FeatureServer/0";

// export default function StatsChart() {
//   const [stats, setStats] = useState({
//     total: 0,
//     completed: 0,
//     underConstruction: 0,
//   });

//   useEffect(() => {
//     const layer = new FeatureLayer({
//       url: FEATURE_LAYER_URL,
//       outFields: ["*"],
//     });

//     async function loadStats() {
//       const total = await layer.queryFeatureCount({ where: "1=1" });
//       const completed = await layer.queryFeatureCount({ where: "Stage = 3" });
//       const underConstruction = await layer.queryFeatureCount({ where: "Stage = 2" });

//       setStats({ total, completed, underConstruction });
//     }

//     loadStats();
//   }, []);

//   const data = {
//     labels: ["Completed", "Under Construction", "Remaining"],
//     datasets: [
//       {
//         label: "Projects",
//         data: [
//           stats.completed,
//           stats.underConstruction,
//           stats.total - stats.completed - stats.underConstruction,
//         ],
//         backgroundColor: ["#22c55e", "#facc15", "#3b82f6"],
//         borderColor: ["#16a34a", "#eab308", "#2563eb"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto">
//       <h2 className="text-2xl font-bold text-gray-700 mb-6">Project Statistics</h2>
//       <Pie data={data} />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

ChartJS.register(ArcElement, Tooltip, Legend);

const FEATURE_LAYER_URL =
  "https://services1.arcgis.com/dEWY7aW7h9zHrSP9/arcgis/rest/services/Development_Projects/FeatureServer/0";

export default function StatsPieAHDA() {
  const [stats, setStats] = useState({ total: 0, completed: 0, underConstruction: 0 });

  useEffect(() => {
    const layer = new FeatureLayer({ url: FEATURE_LAYER_URL, outFields: ["*"] });
    async function load() {
      const total = await layer.queryFeatureCount({ where: "1=1" });
      const completed = await layer.queryFeatureCount({ where: "Stage = 3" });
      const underConstruction = await layer.queryFeatureCount({ where: "Stage = 2" });
      setStats({ total, completed, underConstruction });
    }
    load();
  }, []);

  const data = {
    labels: ["Completed", "Under Construction", "Other"],
    datasets: [
      {
        data: [
          stats.completed,
          stats.underConstruction,
          Math.max(0, stats.total - stats.completed - stats.underConstruction),
        ],
        backgroundColor: [
          "#0B6E4F",  // لون أخضر مشابه لـ AHDA
          "#F2C94C",  // لون أصفر / ذهبي (accent)
          "#B2B2B2",  // لون محايد للفئات الأخرى
        ],
        borderColor: [
          "#0A5D3E",
          "#D4B544",
          "#888888",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
    <h3 className="font-bold text-[#4e4e4e] text-lg mb-4"> PROJECTS STATISTICS </h3>
    <div className="p-4 rounded-sm  max-w-sm mx-auto bg-[#f4f6f9]">
       <h3 className="font-bold text-[#4e4e4e] text-lg mb-4"> Projects Statue </h3>
      <Pie  data={data} />
    </div>
    </>
  );
}
