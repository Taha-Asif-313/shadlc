import React, { useState } from "react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean; // Allow multiple sections to be open
  defaultOpenIndex?: number[]; // Default open indexes
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  className?: string;
  iconOpen?: React.ReactNode; // Icon when expanded
  iconClose?: React.ReactNode; // Icon when collapsed
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIndex = [],
  borderColor = "border-gray-300",
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  padding = "p-4",
  className = "",
  iconOpen = "−", // Default icon for open state
  iconClose = "+", // Default icon for closed state
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpenIndex);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`border ${borderColor} rounded-md overflow-hidden `}
        >
          {/* Accordion Header */}
          <button
            onClick={() => handleToggle(index)}
            className={`w-full flex justify-between items-center ${padding} ${backgroundColor} ${textColor} font-semibold focus:outline-none`}
          >
            {item.title}
            <span className="text-xl">
              {openIndexes.includes(index) ? iconOpen : iconClose}
            </span>
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndexes.includes(index) ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className={`border-t ${borderColor} ${padding} ${backgroundColor}`}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
