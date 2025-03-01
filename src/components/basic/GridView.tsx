import React, { useState, useEffect, useMemo } from "react";

type ScreenSize = "sm" | "md" | "lg";

interface ResponsiveProps<T> {
  sm?: T;
  md?: T;
  lg?: T;
}

interface GridViewProps {
  columns?: ResponsiveProps<number>;
  gap?: ResponsiveProps<number>;
  padding?: ResponsiveProps<string>;
  alignItems?: ResponsiveProps<"start" | "center" | "end" | "stretch">;
  justifyItems?: ResponsiveProps<"start" | "center" | "end" | "stretch">;
  backgroundColor?: string;
  children: React.ReactNode;
  className?: string
}

const GridView: React.FC<GridViewProps> = ({
  columns = { sm: 1, md: 2, lg: 3 },
  gap = { sm: 10, md: 20, lg: 30 },
  padding = { sm: "10px", md: "20px", lg: "40px" },
  alignItems = { sm: "stretch", md: "center", lg: "center" },
  justifyItems = { sm: "stretch", md: "center", lg: "center" },
  backgroundColor = "#f4f4f4",
  children,
  className
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

  // Use memoization for performance optimization
  const styles = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${columns[screenSize]}, 1fr)`,
      gap: `${gap[screenSize]}px`,
      padding: padding[screenSize],
      alignItems: alignItems[screenSize],
      justifyItems: justifyItems[screenSize],
      backgroundColor: backgroundColor,
      width: "100%",
      height: "100%",
    }),
    [screenSize, columns, gap, padding, alignItems, justifyItems, backgroundColor]
  );

  return <div className={className} style={styles}>{children}</div>;
};

export default GridView;
