import React from "react";

interface ImageCardProps {
  src: string;
  title: string;
  description?: string;
  className?: string;
  ImageClassName?: string;
  buttonText?: string;
  buttonOnClick?: () => void;
  buttonClassName?: string;
  buttonIcon?: React.ReactNode;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  src,
  title,
  description,
  className,
  ImageClassName,
  buttonText,
  buttonOnClick,
  buttonClassName = "",
  buttonIcon,
}) => {
  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg ${className}`}>
      <img src={src} alt={title} className={`w-full h-64 object-cover ${ImageClassName}`} />
      <div className="absolute bottom-0 bg-black bg-opacity-50 p-4 text-white w-full">
        <h3 className="text-lg font-bold">{title}</h3>
        {description && <p className="text-sm">{description}</p>}

        {/* Button */}
        {buttonText && buttonOnClick && (
          <button
            onClick={buttonOnClick}
            className={`flex mt-2 items-center gap-2 px-4 py-2 text-[12px] bg-black text-white rounded-md transition-all ${buttonClassName}`}
          >
            {buttonIcon && <span>{buttonIcon}</span>}
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
