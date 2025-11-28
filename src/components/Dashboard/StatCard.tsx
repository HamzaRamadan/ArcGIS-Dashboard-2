/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

export default function StatCard({ title, value }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-[#132032] p-5 rounded-xl border border-gray-700 shadow-md"
    >
      <h4 className="text-gray-400 text-sm">{title}</h4>
      <p className="text-3xl font-bold mt-2 text-green-400">{value}</p>
    </motion.div>
  );
}
