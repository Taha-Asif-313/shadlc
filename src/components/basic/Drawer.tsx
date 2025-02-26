import React, { ReactNode, useEffect, useState } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  overlayColor?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  footerButtons?: { label: string; onClick: () => void; color?: string }[];
  enterAnimation?: string;
  exitAnimation?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  width = "300px",
  height = "100vh",
  bgColor = "bg-white",
  textColor = "text-black",
  overlayColor = "bg-black bg-opacity-50",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  footerButtons = [],
  enterAnimation = "animate-slide-in-right",
  exitAnimation = "animate-slide-out-right",
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300); // Ensure animation plays before unmounting
    }
  }, [isOpen]);

  useEffect(() => {
    if (!closeOnEsc) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, closeOnEsc]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex z-50 ${overlayColor} transition-opacity duration-300`}
    >
      {closeOnOverlayClick && (
        <div className="absolute inset-0" onClick={onClose}></div>
      )}

      <div
        className={`fixed shadow-lg ${bgColor} ${textColor} ${
          isOpen ? enterAnimation : exitAnimation
        }`}
        style={{
          ...(position === "right" || position === "left"
            ? { width, height: "100vh" }
            : { width: "100%", height }),
          [position]: "0",
        }}
      >
        {/* Header */}
        {title && (
          <div className="flex justify-between items-center border-b p-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <button className="text-xl font-bold" onClick={onClose}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
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

        {/* Content */}
        <div className="p-4">{children}</div>

        {/* Footer */}
        {footerButtons.length > 0 && (
          <div className="flex justify-end border-t p-4 space-x-2">
            {footerButtons.map((btn, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded ${
                  btn.color || "bg-blue-500 text-white"
                }`}
                onClick={btn.onClick}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
