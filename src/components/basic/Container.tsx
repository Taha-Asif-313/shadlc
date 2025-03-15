import React, { useMemo, useState, useEffect } from "react";

type ScreenSize = "sm" | "md" | "lg";

interface ResponsiveProps<T> {
  sm?: T;
  md?: T;
  lg?: T;
}

interface ContainerProps {
  display?: ResponsiveProps<"block" | "flex" | "grid" | "inline-block">;
  flexDirection?: ResponsiveProps<"row" | "column" | "row-reverse" | "column-reverse">;
  justifyContent?: ResponsiveProps<"flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly">;
  alignItems?: ResponsiveProps<"flex-start" | "center" | "flex-end" | "stretch" | "baseline">;
  gridTemplateColumns?: ResponsiveProps<string>;
  gridTemplateRows?: ResponsiveProps<string>;
  gap?: ResponsiveProps<string>;
  rowGap?: ResponsiveProps<string>;
  columnGap?: ResponsiveProps<string>;
  width?: ResponsiveProps<string>;
  maxWidth?: ResponsiveProps<string>;
  height?: ResponsiveProps<string>;
  padding?: ResponsiveProps<string>;
  margin?: ResponsiveProps<string>;
  textAlign?: ResponsiveProps<"left" | "center" | "right">;
  backgroundColor?: string;
  border?: ResponsiveProps<string>;
  borderRadius?: ResponsiveProps<string>;
  boxShadow?: ResponsiveProps<string>;
  overflow?: ResponsiveProps<"visible" | "hidden" | "scroll" | "auto">;
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  display = { sm: "block", md: "flex", lg: "grid" },
  flexDirection = { sm: "column", md: "row", lg: "row" },
  justifyContent = { sm: "flex-start", md: "center", lg: "space-between" },
  alignItems = { sm: "stretch", md: "center", lg: "center" },
  gridTemplateColumns = { sm: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" },
  gridTemplateRows = { sm: "auto", md: "auto", lg: "auto" },
  gap = { sm: "10px", md: "20px", lg: "30px" },
  rowGap = { sm: "10px", md: "15px", lg: "20px" },
  columnGap = { sm: "10px", md: "15px", lg: "20px" },
  width = { sm: "100%", md: "90%", lg: "80%" },
  maxWidth = { sm: "100%", md: "800px", lg: "1200px" },
  height = { sm: "auto", md: "auto", lg: "auto" },
  padding = { sm: "10px", md: "20px", lg: "40px" },
  margin = { sm: "0 auto", md: "0 auto", lg: "0 auto" },
  textAlign = { sm: "left", md: "center", lg: "center" },
  backgroundColor = "#ffffff",
  border = { sm: "none", md: "1px solid #ddd", lg: "2px solid #ccc" },
  borderRadius = { sm: "0px", md: "8px", lg: "12px" },
  boxShadow = { sm: "none", md: "0px 4px 6px rgba(0,0,0,0.1)", lg: "0px 6px 10px rgba(0,0,0,0.15)" },
  overflow = { sm: "visible", md: "hidden", lg: "auto" },
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
      display: display[screenSize],
      flexDirection: flexDirection[screenSize],
      justifyContent: justifyContent[screenSize],
      alignItems: alignItems[screenSize],
      gridTemplateColumns: gridTemplateColumns[screenSize],
      gridTemplateRows: gridTemplateRows[screenSize],
      gap: gap[screenSize],
      rowGap: rowGap[screenSize],
      columnGap: columnGap[screenSize],
      width: width[screenSize],
      maxWidth: maxWidth[screenSize],
      height: height[screenSize],
      padding: padding[screenSize],
      margin: margin[screenSize],
      textAlign: textAlign[screenSize],
      backgroundColor,
      border: border[screenSize],
      borderRadius: borderRadius[screenSize],
      boxShadow: boxShadow[screenSize],
      overflow: overflow[screenSize],
      boxSizing: "border-box" as const,
    }),
    [screenSize, display, flexDirection, justifyContent, alignItems, gridTemplateColumns, gridTemplateRows, gap, rowGap, columnGap, width, maxWidth, height, padding, margin, textAlign, backgroundColor, border, borderRadius, boxShadow, overflow]
  );

  return <div className={className} style={styles}>{children}</div>;
};

export default Container;
