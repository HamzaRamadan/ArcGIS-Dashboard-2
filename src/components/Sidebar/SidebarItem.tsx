import { motion } from "framer-motion";
import type { ReactNode } from "react";
type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
};
export default function SidebarItem({ icon, text, active, onClick }: SidebarItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
      ${active ? "bg-[#1c2a3d]" : "hover:bg-[#1a2638]"}`}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </motion.div>
  );
}
