import React, { useState, useRef, useEffect } from "react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number[];
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  padding?: string;
  margin?: string;
  className?: string;
  iconOpen?: React.ReactNode;
  iconClose?: React.ReactNode;
  transitionDuration?: string;
  borderRadius?: string;
  shadow?: string;
  contentPadding?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIndex = [],
  borderColor = "border-gray-300",
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  hoverColor = "hover:bg-gray-100",
  padding = "p-4",
  margin = "mb-3",
  className = "",
  iconOpen = "−",
  iconClose = "+",
  transitionDuration = "duration-300",
  borderRadius = "rounded-md",
  shadow = "shadow-md",
  contentPadding = "p-4",
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpenIndex);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (el) {
        el.style.maxHeight = openIndexes.includes(index) ? `${el.scrollHeight}px` : "0px";
      }
    });
  }, [openIndexes]);

  const handleToggle = (index: number) => {
    setOpenIndexes((prev) =>
      allowMultiple
        ? prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
        : prev.includes(index)
        ? []
        : [index]
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={`border ${borderColor} ${borderRadius} ${shadow} overflow-hidden ${margin}`}>
          {/* Accordion Header */}
          <button
            onClick={() => handleToggle(index)}
            className={`w-full flex justify-between items-center ${padding} ${backgroundColor} ${textColor} font-semibold focus:outline-none ${hoverColor}`}
          >
            <span>{item.title}</span>
            <span className="text-xl">{openIndexes.includes(index) ? iconOpen : iconClose}</span>
          </button>

          {/* Accordion Content */}
          <div
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            className={`transition-all ${transitionDuration} ease-in-out overflow-hidden`}
          >
            <div className={`border-t ${borderColor} ${contentPadding} ${backgroundColor}`}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
