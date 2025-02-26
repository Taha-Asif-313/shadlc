import React from "react";

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

export const TableHead: React.FC<TableHeadProps> = ({ children, className }) => {
  return <thead className={`bg-gray-200 ${className}`}>{children}</thead>;
};
