import React, { useEffect, useMemo, useState } from "react";

interface DrawerProps {
  open: boolean; // Whether the drawer is open
  onClose?: () => void; // Callback to close the drawer
  position?: "left" | "right" | "top" | "bottom"; // Drawer placement
  width?: string; // For left/right drawers
  height?: string; // For top/bottom drawers
  backgroundColor?: string; // Drawer background color
  transitionDuration?: number; // Animation duration in milliseconds
  style?: React.CSSProperties; // Custom styles
  children: React.ReactNode; // Drawer content
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  position = "left",
  width = "250px",
  height = "250px",
  backgroundColor = "#fff",
  transitionDuration = 300,
  style = {},
  children,
}) => {
  const [isVisible, setIsVisible] = useState(open);

  // Ensures drawer state doesn't flash on reload
  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), transitionDuration);
    }
  }, [open, transitionDuration]);

  // Determines transform styles for open/close animation
  const transform = useMemo(() => {
    if (open) return "translate(0, 0)";
    switch (position) {
      case "left":
        return "translateX(-100%)";
      case "right":
        return "translateX(100%)";
      case "top":
        return "translateY(-100%)";
      case "bottom":
        return "translateY(100%)";
      default:
        return "translate(0, 0)";
    }
  }, [open, position]);

  // Drawer styles
  const drawerStyle: React.CSSProperties = useMemo(
    () => ({
      position: "fixed",
      zIndex: 1000,
      backgroundColor,
      transition: `transform ${transitionDuration}ms ease-in-out, opacity ${transitionDuration}ms ease-in-out`,
      transform,
      opacity: open ? 1 : 0,
      ...style,
      ...(position === "left" || position === "right"
        ? { top: 0, [position]: 0, width, height: "100%" }
        : { left: 0, [position]: 0, width: "100%", height }),
    }),
    [transform, open, backgroundColor, transitionDuration, style, position, width, height]
  );

  // Overlay styles
  const overlayStyle: React.CSSProperties = useMemo(
    () => ({
      position: "fixed",
      display: isVisible ? "block" : "none",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
      transition: `opacity ${transitionDuration}ms ease-in-out`,
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
    }),
    [isVisible, open, transitionDuration]
  );

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={drawerStyle}>{children}</div>
    </>
  );
};

export default Drawer;
