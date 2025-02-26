import React from "react";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const CustomTable: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse border border-gray-300 ${className}`}>
        {children}
      </table>
    </div>
  );
};
