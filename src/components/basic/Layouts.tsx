import React from "react";

interface FlexboxProps {
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: string;
  className?: string;
  children: React.ReactNode;
}

export const Flexbox: React.FC<FlexboxProps> = ({
  direction = "row",
  align = "stretch",
  justify = "start",
  wrap = "nowrap",
  gap = "0",
  className = "",
  children,
}) => {
  const flexClasses = `flex flex-${direction} items-${align} justify-${justify} flex-${wrap} gap-${gap} ${className}`;

  return <div className={flexClasses}>{children}</div>;
};

interface GridViewProps {
  cols?: number;
  gap?: string;
  className?: string;
  children: React.ReactNode;
}

export const GridView: React.FC<GridViewProps> = ({
  cols = 2,
  gap = "4",
  className = "",
  children,
}) => {
  const gridClasses = `grid grid-cols-${cols} gap-${gap} ${className}`;

  return <div className={gridClasses}>{children}</div>;
};
