import React from "react";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  background?: string;
  textColor?: string;
  borderRadius?: string;
  padding?: string;
  shadow?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageHeight?: string;
  svgIcon?: React.ReactNode;
  useSvgInsteadOfImage?: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonOnClick?: () => void;
  buttonClassName?: string;
  buttonIcon?: React.ReactNode;
  margin?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  contentClassName = "",
  background = "#f0f0f0",
  textColor = "#333",
  borderRadius = "8px",
  padding = "16px",
  shadow = "0px 4px 6px rgba(0, 0, 0, 0.1)",
  imageSrc,
  imageAlt = "Card Image",
  imageWidth = "100%",
  imageHeight = "200px",
  svgIcon,
  useSvgInsteadOfImage = false,
  title,
  subtitle,
  buttonText,
  buttonOnClick,
  buttonClassName = "",
  buttonIcon,
  margin
}) => {
  return (
    <div
      className={`rounded-lg ${className}`}
      style={{
        background: background,
        color: textColor,
        borderRadius,
        padding,
        margin,
        boxShadow: shadow,
      }}
    >
      {/* Image or SVG Icon */}
      {useSvgInsteadOfImage && svgIcon ? (
        <div className="flex justify-center items-center mb-4">{svgIcon}</div>
      ) : (
        imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{ width: imageWidth, height: imageHeight, borderRadius }}
            className="object-cover mb-4"
          />
        )
      )}
      <div className={`${contentClassName} w-full`}>
        {/* Title & Subtitle */}
        {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
        {subtitle && (
          <p className="text-sm opacity-80 mb-4 w-full">{subtitle}</p>
        )}

        {/* Card Content */}
        {children && <div className="mb-4">{children}</div>}

        {/* Button */}
        {buttonText && buttonOnClick && (
          <button
            onClick={buttonOnClick}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all ${buttonClassName}`}
          >
            {buttonIcon && <span>{buttonIcon}</span>}
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
