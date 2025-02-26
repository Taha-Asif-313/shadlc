import React, { useState } from "react";

interface SortableTableHeaderProps {
  label: string;
  onSort: (order: "asc" | "desc") => void;
}

export const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({ label, onSort }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onSort(newOrder);
  };

  return (
    <th className="px-4 py-2 border cursor-pointer" onClick={handleSort}>
      {label} {sortOrder === "asc" ? "▲" : "▼"}
    </th>
  );
};
