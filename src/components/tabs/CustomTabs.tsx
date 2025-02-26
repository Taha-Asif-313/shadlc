import React, { useState, ReactNode } from "react";

interface TabsProps {
  children: ReactNode;
  defaultActive?: number;
  className?: string;
}

export const CustomTabs: React.FC<TabsProps> = ({ children, defaultActive = 0, className }) => {
  const [activeTab, setActiveTab] = useState(defaultActive);

  return (
    <div className={`w-full ${className}`}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, { activeTab, setActiveTab })
          : child
      )}
    </div>
  );
};
