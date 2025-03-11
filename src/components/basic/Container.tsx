import React, { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

type ScreenSize = "sm" | "md" | "lg";

interface ResponsiveProps<T> {
  sm?: T;
  md?: T;
  lg?: T;
}

interface ContainerProps {
  width?: ResponsiveProps<string>;
  maxWidth?: ResponsiveProps<string>;
  height?: ResponsiveProps<string>;
  padding?: ResponsiveProps<string>;
  margin?: ResponsiveProps<string>;
  textAlign?: ResponsiveProps<"left" | "center" | "right">;
  backgroundColor?: string;
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  width = { sm: "100%", md: "90%", lg: "80%" },
  maxWidth = { sm: "100%", md: "800px", lg: "1200px" },
  height = { sm: "auto", md: "auto", lg: "auto" },
  padding = { sm: "10px", md: "20px", lg: "40px" },
  margin = { sm: "0 auto", md: "0 auto", lg: "0 auto" },
  textAlign = { sm: "left", md: "center", lg: "center" },
  backgroundColor = "#ffffff",
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
      width: width[screenSize],
      maxWidth: maxWidth[screenSize],
      height: height[screenSize],
      padding: padding[screenSize],
      margin: margin[screenSize],
      textAlign: textAlign[screenSize],
      backgroundColor,
      boxSizing: "border-box" as const, // Ensures padding doesn't affect width
    }),
    [screenSize, width, maxWidth, height, padding, margin, textAlign, backgroundColor]
  );

  return <div className={className} style={styles}>{children}</div>;
};

export default Container;
