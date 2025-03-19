import React, { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  footerButtons?: { label: string; onClick: () => void; color?: string }[];
  styles?: {
    overlay?: React.CSSProperties;
    container?: React.CSSProperties;
    header?: React.CSSProperties;
    body?: React.CSSProperties;
    footer?: React.CSSProperties;
    closeIcon?: React.CSSProperties;
    button?: React.CSSProperties;
  };
  classNames?: {
    overlay?: string;
    container?: string;
    header?: string;
    body?: string;
    footer?: string;
    closeIcon?: string;
    button?: string;
  };
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  footerButtons = [],
  styles = {},
  classNames = {},
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

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { width: "25%", maxWidth: "300px" },
    md: { width: "50%", maxWidth: "500px" },
    lg: { width: "75%", maxWidth: "800px" },
    full: { width: "100%", height: "100%" },
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        ...styles.overlay,
      }}
      className={classNames.overlay}
    >
      {closeOnOverlayClick && (
        <div
          style={{ position: "absolute", inset: 0 }}
          onClick={onClose}
        ></div>
      )}

      <div
        style={{
          ...sizeStyles[size],
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          position: "relative",
          zIndex: 1001,
          transform: "scale(0.95)",
          transition: "transform 0.2s ease-in-out",
          ...styles.container,
        }}
        className={classNames.container}
      >
        {/* Modal Header */}
        {title && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              ...styles.header,
            }}
            className={classNames.header}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{title}</h2>
            <button
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                background: "none",
                border: "none",
                cursor: "pointer",
                ...styles.closeIcon,
              }}
              className={classNames.closeIcon}
              onClick={onClose}
            >
              ✖
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div
          style={{ padding: "15px 0", ...styles.body }}
          className={classNames.body}
        >
          {children}
        </div>

        {/* Modal Footer */}
        {footerButtons.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              paddingTop: "10px",
              ...styles.footer,
            }}
            className={classNames.footer}
          >
            {footerButtons.map((btn, index) => (
              <button
                key={index}
                style={{
                  padding: "8px 16px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: btn.color || "#333",
                  color: "#fff",
                  transition: "background-color 0.2s ease-in-out",
                  ...styles.button,
                }}
                className={classNames.button}
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
