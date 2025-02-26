import React, { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  bgColor?: string;
  textColor?: string;
  overlayColor?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  footerButtons?: { label: string; onClick: () => void; color?: string }[];
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  bgColor = "bg-white",
  textColor = "text-black",
  overlayColor = "bg-black bg-opacity-50",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  footerButtons = [],
}) => {
  useEffect(() => {
    if (!closeOnEsc) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, closeOnEsc]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "w-1/4",
    md: "w-1/2",
    lg: "w-3/4",
    full: "w-full h-full",
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${overlayColor}`}
    >
      {closeOnOverlayClick && (
        <div className="absolute inset-0" onClick={onClose}></div>
      )}

      <div
        className={`relative ${sizeClasses[size]} ${bgColor} ${textColor} p-6 rounded-lg shadow-lg transition-all transform scale-95 animate-fade-in`}
      >
        {/* Modal Header */}
        {title && (
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-bold">{title}</h2>
            <button className="text-xl font-bold" onClick={onClose}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path>
              </svg>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="py-4">{children}</div>

        {/* Modal Footer with Custom Buttons */}
        <div className="flex justify-end border-t pt-2 space-x-2">
          {footerButtons.map((btn, index) => (
            <button
              key={index}
              className={`px-4 py-1 rounded ${
                btn.color || "bg-black text-white"
              }`}
              onClick={btn.onClick}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
