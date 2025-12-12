// import { Search, Filter } from "lucide-react";

// interface Props {
//   projectTypes: string[];
//   searchText: string;
//   setSearchText: (v: string) => void;
//   applyFilter: (v: string) => void;
// }

// export default function FilterPanel({
//   projectTypes,
//   searchText,
//   setSearchText,
//   applyFilter,
// }: Props) {
//   return (
//     <div className="absolute top-4 left-4 z-50 w-40 sm:w-48 md:w-56">
//       <div className="backdrop-blur-xl bg-white/90 border border-gray-200 shadow-2xl
//                   rounded-2xl px-3 py-3 sm:px-4 sm:py-4 flex flex-col gap-2 sm:gap-3">

//         {/* Title */}
//         <div className="flex items-center gap-1 sm:gap-2">
//           <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
//           <h4 className="text-xs sm:text-sm font-semibold text-gray-700">
//             Filter by Type
//           </h4>
//         </div>

//         {/* Dropdown */}
//         <div className="relative">
//           <select
//             className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg bg-[#111c2b]
//                    focus:ring-2 focus:ring-blue-500 appearance-none pr-7 sm:pr-8 cursor-pointer"
//             onChange={(e) => applyFilter(e.target.value)}
//           >
//             <option value="ALL">All Types</option>
//             {projectTypes.map((t, i) => (
//               <option key={i} value={t}>
//                 {t}
//               </option>
//             ))}
//           </select>
//           <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs sm:text-base">
//             ▼
//           </span>
//         </div>

//         {/* Search */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search by project name..."
//             className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg bg-[#111c2b]
//                    focus:ring-2 focus:ring-blue-500 pl-8 sm:pl-10"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <Search className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2" />
//         </div>

//       </div>
//     </div>
//   );
// }

import { Search, Filter } from "lucide-react";
import type { FilterPanelProps } from "../../utils/mapview";

export default function FilterPanel({
  projectTypes,
  searchText,
  setSearchText,
  applyFilter,
}: FilterPanelProps) {
  return (
    <div className="absolute top-4 left-4 z-50 w-40 sm:w-48 md:w-56">
      <div
        className="backdrop-blur-xl bg-white/90 border border-gray-200 shadow-2xl 
                  rounded-2xl px-3 py-3 sm:px-4 sm:py-4 flex flex-col gap-2 sm:gap-3"
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          <h4 className="text-xs sm:text-sm font-semibold text-gray-700">
            Filter by Type
          </h4>
        </div>

        <div className="relative">
          <select
            className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg bg-[#111c2b] 
                   focus:ring-2 focus:ring-blue-500 appearance-none pr-7 sm:pr-8 cursor-pointer"
            onChange={(e) => applyFilter(e.target.value)}
          >
            <option value="ALL">All Types</option>
            {projectTypes.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs sm:text-base">
            ▼
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search by project name..."
            className="w-full text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg bg-[#111c2b]
                   focus:ring-2 focus:ring-blue-500 pl-8 sm:pl-10"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Search className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}
