import React from "react";

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return <th className={`px-4 py-2 border ${className}`}>{children}</th>;
};
