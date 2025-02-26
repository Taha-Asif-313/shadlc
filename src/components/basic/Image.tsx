import React from "react";

interface ImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  shadow?: boolean;
  opacity?: number;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  overlayText?: string;
  overlayColor?: string;
  svgIcon?: React.ReactNode; // Use SVG instead of an image
  responsive?: boolean; // Enable responsive scaling
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt = "Image",
  width = "100%",
  height = "100%",
  borderRadius = "8px",
  shadow = false,
  opacity = 1,
  className = "",
  objectFit = "cover",
  overlayText,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  svgIcon,
  responsive = true,
}) => {
  return (
    <div
      className={`relative ${className} ${
        responsive ? "w-full" : ""
      }`}
      style={{ width, height }}
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
          style={{
            width: responsive ? "100%" : width,
            height: responsive ? "100%" : height,
            borderRadius,
            objectFit,
            opacity,
            boxShadow: shadow ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
          }}
          className="w-full h-full"
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
