/* eslint-disable @typescript-eslint/no-explicit-any */
import StatCard from "./StatCard";

export default function DashboardContent({ stats }: any) {
  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">DASHBOARD</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Projects" value={stats.total} />
        <StatCard title="Completed" value={stats.completed} />
        <StatCard title="Under Construction" value={stats.underConstruction} />
        <StatCard title="Pending" value={stats.pending} />
      </div>
    </div>
  );
}
