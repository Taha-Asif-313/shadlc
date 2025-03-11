import React from "react";

interface ImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  borderColor?: string;
  borderStyle?: "solid" | "dashed" | "dotted" | "double" | "none";
  borderWidth?: string;
  shadow?: boolean;
  boxShadow?: string;
  opacity?: number;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  overlayText?: string;
  overlayColor?: string;
  svgIcon?: React.ReactNode; // Render SVG instead of an image
  responsive?: boolean; // Enable responsive scaling
  padding?: string;
  margin?: string;
  lazyLoad?: boolean;
  hoverOpacity?: number;
  hoverShadow?: boolean;
  hoverScale?: number;
  hoverRotate?: number;
  transitionDuration?: string;
  onClick?: () => void;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt = "Image",
  width = "100%",
  height = "100%",
  borderRadius = "8px",
  borderColor = "transparent",
  borderStyle = "solid",
  borderWidth = "0px",
  shadow = false,
  boxShadow,
  opacity = 1,
  className = "",
  objectFit = "cover",
  overlayText,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  svgIcon,
  responsive = false,
  padding,
  margin,
  lazyLoad = false,
  hoverOpacity,
  hoverShadow = false,
  hoverScale,
  hoverRotate,
  transitionDuration = "0.3s",
  onClick,
}) => {
  return (
    <div
      className={`relative ${className} ${responsive ? "w-full" : ""}`}
      style={{
        width,
        height,
        padding,
        margin,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {/* Render SVG instead of image if provided */}
      {svgIcon ? (
        <div className="flex justify-center items-center w-full h-full">
          {svgIcon}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={lazyLoad ? "lazy" : "eager"}
          style={{
            width: responsive ? "100%" : width,
            height: responsive ? "100%" : height,
            borderRadius,
            border: `${borderWidth} ${borderStyle} ${borderColor}`,
            objectFit,
            opacity,
            boxShadow: shadow
              ? boxShadow || "0 4px 8px rgba(0, 0, 0, 0.2)"
              : "none",
            transition: `all ${transitionDuration} ease-in-out`,
          }}
          className="w-full h-full"
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity =
              hoverOpacity !== undefined
                ? hoverOpacity.toString()
                : opacity.toString();
            e.currentTarget.style.boxShadow = hoverShadow
              ? "0 8px 16px rgba(0, 0, 0, 0.3)"
              : boxShadow || "none";
            e.currentTarget.style.transform = `scale(${
              hoverScale || 1
            }) rotate(${hoverRotate || 0}deg)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = opacity.toString();
            e.currentTarget.style.boxShadow = shadow
              ? boxShadow || "0 4px 8px rgba(0, 0, 0, 0.2)"
              : "none";
            e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          }}
        />
      )}

      {/* Overlay with text (optional) */}
      {overlayText && (
        <div
          className="absolute inset-0 flex justify-center items-center text-white text-lg font-bold"
          style={{ backgroundColor: overlayColor }}
        >
          {overlayText}
        </div>
      )}
    </div>
  );
};
