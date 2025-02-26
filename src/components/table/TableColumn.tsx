import React from "react";

interface TableColumnProps {
  children: React.ReactNode;
  className?: string;
}

export const TableColumn: React.FC<TableColumnProps> = ({ children, className }) => {
  return <td className={`px-4 py-2 border ${className}`}>{children}</td>;
};
