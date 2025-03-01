import React, { useState, useEffect, useMemo } from "react";

type ScreenSize = "sm" | "md" | "lg";

interface ResponsiveProps<T> {
  sm?: T;
  md?: T;
  lg?: T;
}

interface GridViewProps {
  columns?: ResponsiveProps<number>;
  gap?: ResponsiveProps<string>; // Changed to string for safety
  padding?: ResponsiveProps<string>;
  alignItems?: ResponsiveProps<"start" | "center" | "end" | "stretch">;
  justifyItems?: ResponsiveProps<"start" | "center" | "end" | "stretch">;
  backgroundColor?: string;
  children: React.ReactNode;
  className?: string;
  width?: ResponsiveProps<string>;
  maxWidth?: ResponsiveProps<string>;
  height?: ResponsiveProps<string>;
}

const GridView: React.FC<GridViewProps> = ({
  columns = { sm: 1, md: 2, lg: 3 },
  gap = { sm: "10px", md: "20px", lg: "30px" }, // Changed default to string
  padding = { sm: "10px", md: "20px", lg: "40px" },
  alignItems = { sm: "stretch", md: "center", lg: "center" },
  justifyItems = { sm: "stretch", md: "center", lg: "center" },
  backgroundColor = "#f4f4f4",
  width = { sm: "100%", md: "100%", lg: "100%" },
  maxWidth = { sm: "100%", md: "100%", lg: "100%" },
  height = { sm: "auto", md: "auto", lg: "auto" },
  children,
  className,
}) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("lg");

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) setScreenSize("sm");
      else if (window.innerWidth < 1024) setScreenSize("md");
      else setScreenSize("lg");
    };

    updateSize(); // Set initial state
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Memoized styles
  const styles = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${columns[screenSize]}, 1fr)`,
      gap: gap[screenSize], // Already a string
      padding: padding[screenSize],
      alignItems: alignItems[screenSize],
      justifyItems: justifyItems[screenSize],
      backgroundColor,
      width: width[screenSize], // Applied
      maxWidth: maxWidth[screenSize], // Applied
      height: height[screenSize], // Applied
    }),
    [screenSize, columns, gap, padding, alignItems, justifyItems, width, maxWidth, height]
  );

  return <div className={className} style={styles}>{children}</div>;
};

export default GridView;
