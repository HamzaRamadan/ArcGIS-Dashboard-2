/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { X } from "lucide-react";

const CLASS_LABELS: Record<number, string> = {
  1: "Commercial Development",
  2: "Industrial Development",
  3: "Residential Development",
  4: "Airport Review",
  5: "Other Type of Development",
  6: "Land Division",
};

const STAGE_LABELS: Record<number, string> = {
  1: "Review Stage",
  2: "Approved / Under Construction",
  3: "Construction Completed",
  4: "Other 4",
  5: "Other 5",
};

const TYPE_LABELS: Record<number, string> = {
  1: "New Construction",
  2: "Building / Site Addition",
  3: "CUP / Site Plan Review",
};

export default function ProjectPopup({ project, onClose }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-[#132032] p-8 rounded-xl w-[450px] border border-gray-700 relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-300 hover:text-white"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-4">{project.Name}</h2>

        <div className="text-gray-300 space-y-2">
          <p><b>Type:</b> {CLASS_LABELS[project.Class] || "N/A"}</p>
          <p><b>Stage:</b> {STAGE_LABELS[project.Stage] || "N/A"}</p>
          <p><b>Premises Type:</b> {TYPE_LABELS[project.Type] || "N/A"}</p>
          <p><b>Year:</b> {project.Year || "N/A"}</p>
          <p><b>Size:</b> {project.Size || "N/A"}</p>
          {project.Inspection && (
            <p>
              <b>Inspection:</b>{" "}
              <a
                href={project.Inspection}
                target="_blank"
                className="text-blue-400 underline"
              >
                Link
              </a>
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
