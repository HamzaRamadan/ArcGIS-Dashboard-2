import SidebarItem from "./SidebarItem";
import { LayoutDashboard, Layers, FileStack, Folder, BarChart2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      className="
        bg-[#111c2b] p-6 flex flex-col gap-6 border-r border-gray-800
        w-64 h-screen fixed top-0 left-0 z-40
        lg:static shadow-2xl
      "
    >
      <h1 className="text-xl font-bold flex items-center gap-2 mt-8 lg:mt-0">
        <span className="text-green-400">●</span> Dashboard ArcGIS
      </h1>

      <nav className="flex flex-col gap-1 mt-4">
        <NavLink to="/dashboard">
          {({ isActive }) => (
            <SidebarItem
              icon={<LayoutDashboard />}
              text="Dashboard"
              active={isActive}
              onClick={() => {}}
            />
          )}
        </NavLink>

        <NavLink to="/charts">
          {({ isActive }) => (
            <SidebarItem
              icon={<FileStack />}
              text="Projects statistics"
              active={isActive}
              onClick={() => {}}
            />
          )}
        </NavLink>

        <NavLink to="/development-projects">
          {({ isActive }) => (
            <SidebarItem
              icon={<Layers />}
              text="Development Projects"
              active={isActive}
              onClick={() => {}}
            />
          )}
        </NavLink>

        <NavLink to="/nationwide-charts">
          {({ isActive }) => (
            <SidebarItem
              icon={<BarChart2 />}
              text="Nationwide Charts"
              active={isActive}
              onClick={() => {}}
            />
          )}
        </NavLink>

        <NavLink to="/projects">
          {({ isActive }) => (
            <SidebarItem
              icon={<Folder />}
              text="Projects"
              active={isActive}
              onClick={() => {}}
            />
          )}
        </NavLink>
      </nav>
    </aside>
  );
}
