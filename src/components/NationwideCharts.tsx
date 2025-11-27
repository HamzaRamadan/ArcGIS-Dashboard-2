/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// ألوان ahda.gov.sa
const COLORS = {
  primary: "#0B6E4F",
  accent: "#F2C94C",
  blue: "#4FA9FF",
  bg: "#F4F6F9"
};

export default function NationwideCharts({ chartData }: { chartData: any }) {

  // ================= POPULATION =================
  const barPopulation = {
    labels: ["2016", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "Average population",
        data: chartData.population,
        backgroundColor: COLORS.blue,
        borderColor: COLORS.accent,
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  // ================= AGING INDEX =================
  const lineAging = {
    labels: ["2016", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "Aging index",
        data: chartData.agingIndex,
        fill: true,
        backgroundColor: `${COLORS.blue}22`,
        borderColor: COLORS.primary,
        pointBackgroundColor: COLORS.accent,
        tension: 0.35
      }
    ]
  };

  // ================= GDP GROWTH =================
  const barGDP = {
    labels: ["2016", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "GDP growth rate",
        data: chartData.gdp,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.accent,
        borderWidth: 2,
        borderRadius: 6
      }
    ]
  };

  return (
    <div className="w-full mt-20">

      <h3 className="font-bold text-gray-700 text-lg mb-4">NATIONWIDE</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* POPULATION */}
        <div className="flex-1 p-4 rounded-xl" style={{ background: COLORS.bg }}>
          <p className="text-sm font-semibold mb-2">Average population</p>
          <Bar data={barPopulation} height={140} />
        </div>

        {/* AGING */}
        <div className="flex-1 p-4 rounded-xl" style={{ background: COLORS.bg }}>
          <p className="text-sm font-semibold mb-2">Aging index</p>
          <Line data={lineAging} height={140} />
        </div>

        {/* GDP */}
        <div className="flex-1 p-4 rounded-xl" style={{ background: COLORS.bg }}>
          <p className="text-sm font-semibold mb-2">GDP growth rate</p>
          <Bar data={barGDP} height={140} />
        </div>
      </div>
    </div>
  );
}
