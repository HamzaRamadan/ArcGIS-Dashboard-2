/* eslint-disable @typescript-eslint/no-explicit-any */

import SidebarItem from "./SidebarItem";
import {
  LayoutDashboard,
  Layers,
 
  FileStack,
  Folder,
  BarChart2,
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }: any) {
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#132032] p-2 rounded-lg border border-gray-700"
        onClick={() => setActiveTab("sidebar-open")}
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          bg-[#111c2b] p-6 flex flex-col gap-6 border-r border-gray-800
          w-64 h-screen fixed top-0 left-0 z-40
          transform transition-transform duration-300
          ${activeTab === "sidebar-open" ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static   shadow-2xl   z-9999
        `}
      >
        {/* Close button (Mobile) */}
        <button
          className="lg:hidden absolute top-4 right-4 text-white"
          onClick={() => setActiveTab("dashboard")}
        >
          ✕
        </button>

        <h1 className="text-xl font-bold flex items-center gap-2 mt-8 lg:mt-0">
          <span className="text-green-400">●</span> Dashboard ArcGIS
        </h1>

        <nav className="flex flex-col gap-1 mt-4">
          <SidebarItem
            icon={<LayoutDashboard />}
            text="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <SidebarItem
            icon={<FileStack />}
            text="Projects statistics"
            active={activeTab === "charts"}
            onClick={() => setActiveTab("charts")}
          />
            <SidebarItem
            icon={<Layers />}
            text="Development Projects"
            active={activeTab === "DevelopmentProjects"}
            onClick={() => setActiveTab("DevelopmentProjects")}
          />
            <SidebarItem
            icon={<BarChart2 />}
            text="Nationwide Charts"
            active={activeTab === "NationwideCharts"}
            onClick={() => setActiveTab("NationwideCharts")}
          />
          <SidebarItem
            icon={<Folder />}
            text="Projects"
            active={activeTab === "projects"}
            onClick={() => setActiveTab("projects")}
          />
        
          
        </nav>
      </aside>
    </>
  );
}

