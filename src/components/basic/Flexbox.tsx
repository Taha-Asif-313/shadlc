import React, { useState, useEffect, useMemo } from "react";

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
  className = "", // Ensuring it's always a string
}) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("lg");

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) setScreenSize("sm");
      else if (window.innerWidth < 1024) setScreenSize("md");
      else setScreenSize("lg");
    };

    updateSize(); // Initial state
    const resizeHandler = () => requestAnimationFrame(updateSize);
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

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
