import React, { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

type ScreenSize = "sm" | "md" | "lg";

interface ResponsiveProps<T> {
  sm?: T;
  md?: T;
  lg?: T;
}

interface FlexboxProps {
  direction?: ResponsiveProps<"row" | "column">;
  align?: ResponsiveProps<
    "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
  >;
  justify?: ResponsiveProps<
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
  >;
  gap?: ResponsiveProps<string>;
  padding?: ResponsiveProps<string>;
  backgroundColor?: string;
  children: React.ReactNode;
  width?: ResponsiveProps<string>;
  maxWidth?: ResponsiveProps<string>;
  height?: ResponsiveProps<string>;
  className?: string;
}

const Flexbox: React.FC<FlexboxProps> = ({
  direction = { sm: "column", md: "row", lg: "row" },
  align = { sm: "center", md: "center", lg: "center" },
  justify = { sm: "center", md: "space-between", lg: "space-around" },
  gap = { sm: "10px", md: "20px", lg: "30px" },
  padding = { sm: "10px", md: "20px", lg: "40px" },
  backgroundColor = "#f4f4f4",
  width = { sm: "100%", md: "100%", lg: "100%" },
  height = { sm: "auto", md: "auto", lg: "auto" },
  maxWidth = { sm: "100%", md: "100%", lg: "100%" },
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
      display: "flex",
      flexDirection: direction[screenSize] as "row" | "column",
      alignItems: align[screenSize] as
        | "flex-start"
        | "flex-end"
        | "center"
        | "stretch"
        | "baseline",
      justifyContent: justify[screenSize] as
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly",
      gap: gap[screenSize],
      padding: padding[screenSize],
      backgroundColor,
      width: width[screenSize],
      maxWidth: maxWidth[screenSize],
      height: height[screenSize],
    }),
    [screenSize, direction, align, justify, gap, padding, width, maxWidth, height, backgroundColor]
  );

  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
};

export default Flexbox;
