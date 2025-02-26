import React from "react";

interface TabProps {
  children: React.ReactNode;
  index: number;
  activeTab: number;
  setActiveTab: (index: number) => void;
  className?: string;
}

export const Tab: React.FC<TabProps> = ({ children, index, activeTab, setActiveTab, className }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium border-b-2 ${
        activeTab === index ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500"
      } focus:outline-none ${className}`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
};
