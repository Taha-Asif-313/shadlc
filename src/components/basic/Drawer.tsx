import React from "react";

interface DrawerProps {
  open: boolean; // Whether the drawer is open
  onClose?: () => void; // Callback when overlay is clicked to close the drawer
  position?: "left" | "right" | "top" | "bottom"; // From which side the drawer appears
  width?: string; // Applicable for left/right drawers (default: "250px")
  height?: string; // Applicable for top/bottom drawers (default: "250px")
  backgroundColor?: string; // Drawer background color
  transitionDuration?: number; // Transition duration in milliseconds
  style?: React.CSSProperties; // Additional custom inline styles for the drawer
  children: React.ReactNode; // Inner content of the drawer
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
  // Determines the CSS transform property based on the drawer position and open state
  const getTransform = (): string => {
    if (open) {
      return "translate(0, 0)";
    }
    switch (position) {
      case "left":
        return "translate(-100%, 0)";
      case "right":
        return "translate(100%, 0)";
      case "top":
        return "translate(0, -100%)";
      case "bottom":
        return "translate(0, 100%)";
      default:
        return "translate(0, 0)";
    }
  };

  // Base inline styles for the drawer container
  const drawerBaseStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 1000,
    backgroundColor: backgroundColor,
    transition: `transform ${transitionDuration}ms ease-in-out`,
    ...style, // Merge any custom styles provided by the user
  };

  // Set up positioning and sizing based on the 'position' prop
  let drawerSpecificStyle: React.CSSProperties = {};
  switch (position) {
    case "left":
      drawerSpecificStyle = {
        top: 0,
        left: 0,
        width: width,
        height: "100%",
        transform: getTransform(),
      };
      break;
    case "right":
      drawerSpecificStyle = {
        top: 0,
        right: 0,
        width: width,
        height: "100%",
        transform: getTransform(),
      };
      break;
    case "top":
      drawerSpecificStyle = {
        top: 0,
        left: 0,
        width: "100%",
        height: height,
        transform: getTransform(),
      };
      break;
    case "bottom":
      drawerSpecificStyle = {
        bottom: 0,
        left: 0,
        width: "100%",
        height: height,
        transform: getTransform(),
      };
      break;
  }

  // Combine base and specific styles
  const combinedStyles = { ...drawerBaseStyle, ...drawerSpecificStyle };

  // Optional overlay style that dims the background when the drawer is open
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
    transition: `opacity ${transitionDuration}ms ease-in-out`,
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none", // Allows clicks only when visible
  };

  return (
    <>
      {/* Overlay for closing the drawer */}
      <div style={overlayStyle} onClick={onClose} />
      {/* Drawer container with inner content */}
      <div style={combinedStyles}>
        {children}
      </div>
    </>
  );
};

export default Drawer;
