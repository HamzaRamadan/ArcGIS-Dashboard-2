/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const CLASS_LABELS: Record<number, string> = {
  1: "Commercial Development",
  2: "Industrial Development",
  3: "Residential Development",
  4: "Airport Review",
  5: "Other Type of Development",
  6: "Land Division",
};

const ITEMS_PER_PAGE = 9;

export default function ProjectsList({ projects, setSelectedProject }: any) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = projects.filter((p: any) =>
    (p.Name || "").toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const goToPage = (p: number) => {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    setPage(p);
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6"> PROJECTS</h3>

      <input
        type="text"
        placeholder="Search project..."
        className="p-3 bg-[#0f1a2b] border border-gray-700 rounded-lg w-full mb-6"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1); // Reset page on search
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentItems.map((p: any, i: number) => (
          <div
            key={i}
            onClick={() => setSelectedProject(p)}
            className="bg-[#132032] p-5 rounded-xl border border-gray-700 hover:border-green-400 cursor-pointer transition-transform transform hover:scale-105"
          >
            <h4 className="font-bold text-lg">{p.Name || "No Name"}</h4>
            <p className="text-gray-400 text-sm mt-2">
              Type: {CLASS_LABELS[p.Class] || "N/A"}
            </p>
          </div>
        ))}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-[#0f1a2b] text-gray-400 hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>

          {/* Display first page */}
          {page > 2 && (
            <button
              onClick={() => goToPage(1)}
              className="px-3 py-1 rounded bg-[#0f1a2b] text-gray-400 hover:bg-gray-700"
            >
              1
            </button>
          )}

          {/* Ellipsis if needed */}
          {page > 3 && <span className="text-gray-400">...</span>}

          {/* Current page +/-1 */}
          {page > 1 && (
            <button
              onClick={() => goToPage(page - 1)}
              className="px-3 py-1 rounded bg-[#0f1a2b] text-gray-400 hover:bg-gray-700"
            >
              {page - 1}
            </button>
          )}

          <button className="px-3 py-1 rounded bg-green-600 text-white">{page}</button>

          {page < totalPages && (
            <button
              onClick={() => goToPage(page + 1)}
              className="px-3 py-1 rounded bg-[#0f1a2b] text-gray-400 hover:bg-gray-700"
            >
              {page + 1}
            </button>
          )}

          {/* Ellipsis if needed */}
          {page < totalPages - 2 && <span className="text-gray-400">...</span>}

          {/* Display last page */}
          {page < totalPages - 1 && (
            <button
              onClick={() => goToPage(totalPages)}
              className="px-3 py-1 rounded bg-[#0f1a2b] text-gray-400 hover:bg-gray-700"
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-[#0f1a2b] text-gray-400 hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
