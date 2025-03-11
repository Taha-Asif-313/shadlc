import React, { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

type ScreenSize = "sm" | "md" | "lg";

interface ResponsiveProps<T> {
  sm?: T;
  md?: T;
  lg?: T;
}

interface GridViewProps {
  columns?: ResponsiveProps<number>;
  gap?: ResponsiveProps<string>;
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
  gap = { sm: "10px", md: "20px", lg: "30px" },
  padding = { sm: "10px", md: "20px", lg: "40px" },
  alignItems = { sm: "stretch", md: "center", lg: "center" },
  justifyItems = { sm: "stretch", md: "center", lg: "center" },
  backgroundColor = "#f4f4f4",
  width = { sm: "100%", md: "100%", lg: "100%" },
  maxWidth = { sm: "100%", md: "100%", lg: "100%" },
  height = { sm: "auto", md: "auto", lg: "auto" },
  children,
  className = "",
}) => {
  // Media Queries for screen sizes
  const isSmall = useMediaQuery({ maxWidth: 767 });
  const isMedium = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  // Determine screen size
  const screenSize: ScreenSize = isSmall ? "sm" : isMedium ? "md" : "lg";

  // Memoized styles
  const styles = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${columns[screenSize]}, 1fr)`,
      gap: gap[screenSize],
      padding: padding[screenSize],
      alignItems: alignItems[screenSize],
      justifyItems: justifyItems[screenSize],
      backgroundColor,
      width: width[screenSize],
      maxWidth: maxWidth[screenSize],
      height: height[screenSize],
    }),
    [screenSize, columns, gap, padding, alignItems, justifyItems, width, maxWidth, height, backgroundColor]
  );

  return <div className={className} style={styles}>{children}</div>;
};

export default GridView;
