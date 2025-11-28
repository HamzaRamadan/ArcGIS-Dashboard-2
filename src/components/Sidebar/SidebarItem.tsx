/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

export default function SidebarItem({ icon, text, active, onClick }: any) {
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
