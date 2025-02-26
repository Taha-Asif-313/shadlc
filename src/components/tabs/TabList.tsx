import React, { ReactNode } from "react";

interface TabListProps {
  children: ReactNode;
  className?: string;
}

export const TabList: React.FC<TabListProps> = ({ children, className }) => {
  return <div className={`flex border-b ${className}`}>{children}</div>;
};
