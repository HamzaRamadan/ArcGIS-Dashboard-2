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

const COLORS = {
  primary: "#0B6E4F",
  accent: "#F2C94C",
  blue: "#4FA9FF",
  bg: "#132032"
};

export default function NationwideCharts({ chartData }: { chartData: any }) {

  // ================ FIX ERROR HERE =================
  const safeData = chartData || {
    population: [0, 0, 0, 0, 0],
    agingIndex: [0, 0, 0, 0, 0],
    gdp: [0, 0, 0, 0, 0],
  };
  // =================================================

  // ================= POPULATION =================
  const barPopulation = {
    labels: ["2016", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "Average population",
        data: safeData.population,
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
        data: safeData.agingIndex,
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
        data: safeData.gdp,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.accent,
        borderWidth: 2,
        borderRadius: 6
      }
    ]
  };

  return (
    <div className="w-full">

      <h1 className="text-3xl font-bold mb-6">NATIONWIDE </h1>

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
