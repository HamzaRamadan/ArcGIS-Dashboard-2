// import { typeMapping } from "../../utils/typeMapping";

// // ✅ تعريف واجهة المشروع
// interface ProjectFeature {
//   Name: string;
//   Type: number;
//   Stage?: string;
//   Class?: string;
//   Year?: string | number;
//   Size?: string | number;
//   Notes?: string;
// }

// // Props للكومبوننت
// interface Props {
//   selectedFeature: ProjectFeature;
//   onClose: () => void;
// }

// export default function PopupCard({ selectedFeature, onClose }: Props) {
//   return (
//     <div
//       className="absolute z-50 w-[320px] sm:w-[400px] max-w-[90%]
//                rounded-2xl overflow-hidden shadow-2xl
//                animate-[popupShow_0.25s_ease-out]
//                backdrop-blur-2xl bg-gradient-to-r from-[#080D18] to-[#0F1A2B] border border-white/50"
//       style={{
//         top: "1rem",
//         right: "1rem",
//         left: "auto",
//         transform: "none",
//         maxHeight: "80vh",
//       }}
//     >
//       {/* Header */}
//       <div className="relative bg-gradient-to-r from-[#080D18] to-[#0F1A2B] text-white px-4 py-3">
//         <h3 className="text-lg font-bold truncate">
//           {selectedFeature.Name || "Project Name"}
//         </h3>

//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 bg-white/30 hover:bg-white/40
//                transition rounded-full w-8 h-8 flex items-center justify-center"
//         >
//           ✕
//         </button>
//       </div>

//       {/* Body */}
//       <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//         <div className="grid grid-cols-2 gap-2">
//           {[
//             ["Type", typeMapping[selectedFeature.Type], "🗂️"],
//             ["Stage", selectedFeature.Stage, "🚧"],
//             ["Premises", selectedFeature.Class, "🏢"],
//             ["Year", selectedFeature.Year, "📅"],
//             ["Project Size", selectedFeature.Size, "📏"],
//             ["Notes", selectedFeature.Notes, "📝"],
//           ].map(([label, value, icon], i) => (
//             <div
//               key={i}
//               className="flex items-center space-x-2 bg-[#132032] backdrop-blur-md
//                        px-3 py-2 rounded-lg border border-[#0F1A2B] hover:bg-[#0F1A2B] transition text-sm"
//             >
//               <span className="text-xl">{icon}</span>
//               <div className="flex flex-col">
//                 <span className="font-semibold text-[#fff]">{label}</span>
//                 <span className="text-[#fff] font-medium truncate max-w-[120px]">
//                   {value || "-"}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { typeMapping } from "../../utils/typeMapping";
import type { PopupCardProps } from "../../utils/mapview";

export default function PopupCard({
  selectedFeature,
  onClose,
}: PopupCardProps) {
  return (
    <div
      className="absolute z-50 w-[320px] sm:w-[400px] max-w-[90%] 
               rounded-2xl overflow-hidden shadow-2xl 
               animate-[popupShow_0.25s_ease-out]
               backdrop-blur-2xl bg-gradient-to-r from-[#080D18] to-[#0F1A2B] border border-white/50"
      style={{
        top: "1rem",
        right: "1rem",
        left: "auto",
        transform: "none",
        maxHeight: "80vh",
      }}
    >
      <div className="relative bg-gradient-to-r from-[#080D18] to-[#0F1A2B] text-white px-4 py-3">
        <h3 className="text-lg font-bold truncate">
          {selectedFeature.Name || "Project Name"}
        </h3>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white/30 hover:bg-white/40 
               transition rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="grid grid-cols-2 gap-2">
          {[
            ["Type", typeMapping[selectedFeature.Type], "🗂️"],
            ["Stage", selectedFeature.Stage, "🚧"],
            ["Premises", selectedFeature.Class, "🏢"],
            ["Year", selectedFeature.Year, "📅"],
            ["Project Size", selectedFeature.Size, "📏"],
            ["Notes", selectedFeature.Notes, "📝"],
          ].map(([label, value, icon], i) => (
            <div
              key={i}
              className="flex items-center space-x-2 bg-[#132032] backdrop-blur-md 
                       px-3 py-2 rounded-lg border border-[#0F1A2B] hover:bg-[#0F1A2B] transition text-sm"
            >
              <span className="text-xl">{icon}</span>
              <div className="flex flex-col">
                <span className="font-semibold text-[#fff]">{label}</span>
                <span className="text-[#fff] font-medium truncate max-w-[120px]">
                  {value || "-"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
