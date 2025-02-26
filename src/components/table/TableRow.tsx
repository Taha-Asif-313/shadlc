import React from "react";

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return <tr className={`border-b border-gray-300 ${className}`}>{children}</tr>;
};
