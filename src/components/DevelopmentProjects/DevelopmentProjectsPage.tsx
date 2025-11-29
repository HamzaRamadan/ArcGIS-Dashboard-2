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

const COLORS = {
  primary: "#0B6E4F",
  accent: "#F2C94C",
  blue: "#4FA9FF",
  bg: "#132032",
};

const ARCGIS_URL = `https://services1.arcgis.com/dEWY7aW7h9zHrSP9/arcgis/rest/services/Development_Projects/FeatureServer/0/query?
where=1%3D1
&outFields=*
&returnGeometry=false
&f=json
`;

export default function DevelopmentProjectsPage({ mapView, mapLayer }: any) {
  const [projects, setProjects] = useState<any[]>([]);

  // FETCH PROJECTS
  useEffect(() => {
    fetch(ARCGIS_URL)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.features.map((f: any) => f.attributes));
      })
      .catch((err) => console.error("Error loading ArcGIS:", err));
  }, []);

  // -------------------- ZOOM FUNCTION --------------------
  const zoomToProjects = async (field: string, value: number) => {
    if (!mapLayer || !mapView) return;

    const query = mapLayer.createQuery();
    query.where = `${field} = ${value}`;
    query.returnGeometry = true;

    const res = await mapLayer.queryFeatures(query);

    if (res.features.length > 0) {
      const geoms = res.features.map((f: any) => f.geometry);
      mapView.goTo(geoms);
    }
  };

  // ---------------- PREPARE CHART DATA ----------------

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

  const pieOptions = {
    plugins: {
      legend: { labels: { color: "#fff" } },
    },
    onClick: (_evt: any, elements: any[]) => {
      if (!elements.length) return;
      const index = elements[0].index;
      zoomToProjects("Class", index + 1);
    },
  };

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

  const barOptions = {
    plugins: {
      legend: { labels: { color: "#fff" } },
    },
    onClick: (_evt: any, elements: any[]) => {
      if (!elements.length) return;
      const index = elements[0].index;
      zoomToProjects("Stage", index + 1);
    },
  };

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

  const lineOptions = {
    plugins: {
      legend: { labels: { color: "#fff" } },
    },
    onClick: (_evt: any, elements: any[]) => {
      if (!elements.length) return;
      const index = elements[0].index;
      zoomToProjects("Year", index + 1);
    },
  };

  // -------------------- UI -----------------------------

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">DEVELOPMENT PROJECTS</h1>

      <div className="flex flex-col gap-6 w-full max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projects by Type */}
          <div
            className="p-4 rounded-xl flex flex-col items-center justify-center"
            style={{ background: COLORS.bg }}
          >
            <Pie data={pieClassData} height={250} options={pieOptions} />
          </div>

          {/* Projects by Stage */}
          <div
            className="p-4 rounded-xl flex items-center justify-center"
            style={{ background: COLORS.bg }}
          >
            <Bar data={barStageData} height={250} options={barOptions} />
          </div>

          {/* Projects by Year */}
          <div
            className="p-4 rounded-xl flex items-center justify-center"
            style={{ background: COLORS.bg }}
          >
            <Line data={lineYearData} height={250} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
