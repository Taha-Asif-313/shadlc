import React, { ReactNode } from "react";

interface TabPanelProps {
  children: ReactNode;
  className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
