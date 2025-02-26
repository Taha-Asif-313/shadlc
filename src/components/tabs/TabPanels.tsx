import React, { ReactNode } from "react";

interface TabPanelsProps {
  children: ReactNode;
  className?: string;
  activeTab: number;
}

export const TabPanels: React.FC<TabPanelsProps> = ({ children, className, activeTab }) => {
  return <div className={className}>{React.Children.toArray(children)[activeTab]}</div>;
};
