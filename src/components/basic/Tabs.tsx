import React, { useState } from "react";

interface TabItem {
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode; // Optional icon for the tab
}

interface TabsProps {
  tabs: TabItem[];
  defaultActive?: number; // Default active tab index
  tabPosition?: "top" | "left" | "right"; // Tab layout position
  activeTabClass?: string;
  inactiveTabClass?: string;
  tabContainerClass?: string;
  contentContainerClass?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActive = 0,
  tabPosition = "top",
  activeTabClass = "bg-blue-500 text-white",
  inactiveTabClass = "bg-gray-200 text-gray-700",
  tabContainerClass = "",
  contentContainerClass = "p-4",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultActive);

  const isVertical = tabPosition === "left" || tabPosition === "right";

  return (
    <div className={`flex ${isVertical ? "flex-row" : "flex-col"} ${className}`}>
      {/* Tabs Navigation */}
      <div
        className={`flex ${
          isVertical ? "flex-col w-1/4" : "flex-row border-b"
        } ${tabContainerClass}`}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-all ${
              activeTab === index ? activeTabClass : inactiveTabClass
            }`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className={`flex-1 border p-4 ${contentContainerClass}`}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
};
