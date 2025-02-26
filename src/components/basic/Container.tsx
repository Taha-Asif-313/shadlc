import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"; // Responsive sizes
  padding?: string;
  margin?: string;
  background?: string;
  border?: string;
  flex?: boolean;
  grid?: boolean;
  columns?: number; // Only for grid layouts
  align?: "start" | "center" | "end"; // Flexbox & Grid alignment
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  maxWidth = "lg",
  padding = "1rem",
  margin = "auto",
  background = "transparent",
  border = "none",
  flex = false,
  grid = false,
  columns = 3,
  align = "center",
}) => {
  // Map maxWidth prop to actual Tailwind or CSS classes
  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "w-full",
  };

  return (
    <div
      className={`
        ${widthClasses[maxWidth]} 
        ${flex ? "flex justify-" + align : ""} 
        ${grid ? `grid grid-cols-${columns} gap-4` : ""} 
        ${className}
      `}
      style={{
        padding,
        margin,
        background,
        border,
      }}
    >
      {children}
    </div>
  );
};
