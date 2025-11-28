/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartsContent({ stats }: any) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">PROJECTS STATISTICS</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        {/* Pie Chart */}
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
                    borderColor: ["#0B6E4F", "#eab308", "#2563eb"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#fff",
                      font: {
                        size: 12,
                      },
                      padding: 8,
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
