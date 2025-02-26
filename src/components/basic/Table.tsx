import React, { useState } from "react";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  className?: string;
  pagination?: boolean;
  rowsPerPage?: number;
  colors?: {
    headerBg?: string;
    headerText?: string;
    rowBg?: string;
    rowText?: string;
    borderColor?: string;
    hoverBg?: string;
    paginationBg?: string;
    paginationText?: string;
  };
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  className = "",
  pagination = true,
  rowsPerPage = 5,
  colors = {
    headerBg: "bg-blue-500",
    headerText: "text-white",
    rowBg: "bg-white",
    rowText: "text-black",
    borderColor: "border-gray-300",
    hoverBg: "bg-gray-200",
    paginationBg: "bg-gray-300",
    paginationText: "text-black",
  },
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: string) => {
    if (sortColumn === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    return sortOrder === "asc"
      ? a[sortColumn] > b[sortColumn]
        ? 1
        : -1
      : a[sortColumn] < b[sortColumn]
      ? 1
      : -1;
  });

  const paginatedData = pagination
    ? sortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    : sortedData;

  return (
    <div className={`overflow-x-auto w-full ${className}`}>
      <table className={`w-full border-collapse border ${colors.borderColor}`}>
        {/* Table Header */}
        <thead>
          <tr className={`${colors.headerBg} ${colors.headerText} text-left`}>
            {columns.map(({ key, label, sortable }) => (
              <th
                key={key}
                onClick={() => sortable && handleSort(key)}
                className={`p-3 border ${colors.borderColor} ${
                  sortable ? "cursor-pointer hover:opacity-80" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                {label}{" "}
                {sortable &&
                  (sortColumn === key ? (
                    sortOrder === "asc" ? (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 576 512"
                        height="15px"
                        width="15px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3 96 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-301.7 32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l224 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-224 0z"></path>
                      </svg>
                    ) : (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 576 512"
                        height="15px"
                        width="15px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3 96 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-301.7 32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 480l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128l224 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32z"></path>
                      </svg>
                    )
                  ) : (
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 320 512"
                      height="15px"
                      width="15px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3l0 293.5L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7l0-293.5 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z"></path>
                    </svg>
                  ))}
                </div>
               
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${colors.rowBg} ${colors.rowText} hover:${colors.hoverBg}`}
            >
              {columns.map(({ key }) => (
                <td key={key} className={`p-3 border ${colors.borderColor}`}>
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {pagination && (
        <div className="flex justify-between items-center mt-3 p-2">
          <button
            className={`px-3 py-1 ${colors.paginationBg} ${colors.paginationText} rounded-md disabled:opacity-50`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </button>
          <span className={`${colors.paginationText}`}>Page {currentPage}</span>
          <button
            className={`px-3 py-1 ${colors.paginationBg} ${colors.paginationText} rounded-md disabled:opacity-50`}
            disabled={currentPage * rowsPerPage >= data.length}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
