import React, { useMemo, useState, useEffect } from "react";

type ScreenSize = "sm" | "md" | "lg";

interface ResponsiveProps<T> {
  sm?: T;
  md?: T;
  lg?: T;
}

interface GridViewProps {
  columns?: ResponsiveProps<number>;
  rows?: ResponsiveProps<number>;
  gap?: ResponsiveProps<string>;
  rowGap?: ResponsiveProps<string>;
  columnGap?: ResponsiveProps<string>;
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
  rows = { sm: "auto", md: "auto", lg: "auto" },
  gap = { sm: "10px", md: "20px", lg: "30px" },
  rowGap = { sm: "10px", md: "15px", lg: "20px" },
  columnGap = { sm: "10px", md: "15px", lg: "20px" },
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
  const [screenSize, setScreenSize] = useState<ScreenSize>("lg");

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        setScreenSize("sm");
      } else if (width >= 768 && width <= 1023) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const styles = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${columns[screenSize]}, 1fr)`,
      gridTemplateRows: rows[screenSize] !== "auto" ? `repeat(${rows[screenSize]}, 1fr)` : "auto",
      gap: gap[screenSize],
      rowGap: rowGap[screenSize],
      columnGap: columnGap[screenSize],
      padding: padding[screenSize],
      alignItems: alignItems[screenSize],
      justifyItems: justifyItems[screenSize],
      backgroundColor,
      width: width[screenSize],
      maxWidth: maxWidth[screenSize],
      height: height[screenSize],
    }),
    [screenSize, columns, rows, gap, rowGap, columnGap, padding, alignItems, justifyItems, width, maxWidth, height, backgroundColor]
  );

  return <div className={className} style={styles}>{children}</div>;
};

export default GridView;
