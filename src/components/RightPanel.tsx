/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Feature from "./Feature";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement
);

//  ألوان الموقع ahda.gov.sa
const COLORS = {
  primary: "#0B6E4F",
  accent: "#F2C94C",
  blue: "#4FA9FF",
  bg: "#F4F6F9",
};

const ARCGIS_URL = `https://services1.arcgis.com/dEWY7aW7h9zHrSP9/arcgis/rest/services/Development_Projects/FeatureServer/0/query?
where=1%3D1
&outFields=*
&returnGeometry=false
&f=json
`;

// // eslint-disable-next-line no-empty-pattern
export default function RightPanel() {
  const [projects, setProjects] = useState<any[]>([]);

  // ---------------- FETCH ARCGIS DATA ----------------
  useEffect(() => {
    fetch(ARCGIS_URL)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.features.map((f: any) => f.attributes));
      })
      .catch((err) => console.error("Error loading ArcGIS:", err));
  }, []);

  // ---------------- PREPARE ArcGIS CHART DATA ----------------

  // Count by Class (Development Type)
  const countByClass: Record<number, number> = {};
  projects.forEach((p) => {
    countByClass[p.Class] = (countByClass[p.Class] || 0) + 1;
  });

  const classLabels = [
    "Commercial",
    "Industrial",
    "Residential",
    "Airport",
    "Other",
    "Land Division",
  ];

  const pieClassData = {
    labels: classLabels,
    datasets: [
      {
        label: "Projects by Type",
        data: [
          countByClass[1] || 0,
          countByClass[2] || 0,
          countByClass[3] || 0,
          countByClass[4] || 0,
          countByClass[5] || 0,
          countByClass[6] || 0,
        ],
        backgroundColor: [
          "#DC582A",
          "#B2B2B2",
          "#CC8A00",
          "#658D1B",
          "#007096",
          "#FFFF00",
        ],
      },
    ],
  };

  // Count by Stage
  const countByStage: Record<number, number> = {};
  projects.forEach((p) => {
    countByStage[p.Stage] = (countByStage[p.Stage] || 0) + 1;
  });

  const stageLabels = [
    "Review",
    "Under Construction",
    "Completed",
    "Other 4",
    "Other 5",
  ];

  const barStageData = {
    labels: stageLabels,
    datasets: [
      {
        label: "Projects by Stage",
        data: [
          countByStage[1] || 0,
          countByStage[2] || 0,
          countByStage[3] || 0,
          countByStage[4] || 0,
          countByStage[5] || 0,
        ],
        backgroundColor: COLORS.primary,
      },
    ],
  };

  // Count by Year
  const countByYear: Record<number, number> = {};
  projects.forEach((p) => {
    countByYear[p.Year] = (countByYear[p.Year] || 0) + 1;
  });

  const yearLabels = ["2017", "2018", "2019", "2020", "2021", "2022"];

  const lineYearData = {
    labels: yearLabels,
    datasets: [
      {
        label: "Projects by Year",
        data: [
          countByYear[1] || 0,
          countByYear[2] || 0,
          countByYear[3] || 0,
          countByYear[4] || 0,
          countByYear[5] || 0,
          countByYear[6] || 0,
        ],
        borderColor: COLORS.blue,
        backgroundColor: `${COLORS.blue}33`,
        tension: 0.4,
      },
    ],
  };

  // ---------------- UI ----------------

  return (
    // <div className="w-full max-w-full overflow-x-hidden ">
    <div className="flex flex-col gap-6 w-full max-w-full">
      <Feature />
      <h3 className="font-bold text-[#4e4e4e] text-lg mb-4">
        DEVELOPMENT PROJECTS (ArcGIS)
      </h3>

      {/* GRID SYSTEM */}
      <div
        className="
      grid 
      grid-cols-1         
      md:grid-cols-2      
      lg:grid-cols-1      
      gap-6
  "
      >
        {/* PROJECTS BY TYPE */}
        <div className="p-4 rounded-xl" style={{ background: COLORS.bg }}>
          <p className="text-sm font-semibold mb-2">Projects by Type</p>
          <Pie data={pieClassData} height={130} />
        </div>

        {/* PROJECTS BY STAGE */}
        <div className="p-4 rounded-xl" style={{ background: COLORS.bg }}>
          <p className="text-sm font-semibold mb-2">Projects by Stage</p>
          <Bar data={barStageData} height={130} />
        </div>

        {/* PROJECTS BY YEAR */}
        <div className="p-4 rounded-xl" style={{ background: COLORS.bg }}>
          <p className="text-sm font-semibold mb-2">Projects by Year</p>
          <Line data={lineYearData} height={130} />
        </div>
      </div>
    </div>
  );
}
