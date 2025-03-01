import React, { useState, useEffect, useMemo } from "react";

type ScreenSize = "sm" | "md" | "lg";

interface ResponsiveProps<T> {
  sm?: T;
  md?: T;
  lg?: T;
}

interface FlexboxProps {
  direction?: ResponsiveProps<"row" | "column">;
  align?: ResponsiveProps<"flex-start" | "flex-end" | "center" | "stretch" | "baseline">;
  justify?: ResponsiveProps<"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly">;
  gap?: ResponsiveProps<number>;
  padding?: ResponsiveProps<string>;
  backgroundColor?: string;
  children: React.ReactNode;
  className?: string
}

const Flexbox: React.FC<FlexboxProps> = ({
  direction = { sm: "column", md: "row", lg: "row" },
  align = { sm: "center", md: "center", lg: "center" },
  justify = { sm: "center", md: "space-between", lg: "space-around" },
  gap = { sm: 10, md: 20, lg: 30 },
  padding = { sm: "10px", md: "20px", lg: "40px" },
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
      display: "flex",
      flexDirection: direction[screenSize],
      alignItems: align[screenSize],
      justifyContent: justify[screenSize],
      gap: `${gap[screenSize]}px`,
      padding: padding[screenSize],
      backgroundColor: backgroundColor,
      width: "100%",
      height: "100%",
    }),
    [screenSize, direction, align, justify, gap, padding, backgroundColor]
  );

  return <div className={className} style={styles}>{children}</div>;
};

export default Flexbox;
