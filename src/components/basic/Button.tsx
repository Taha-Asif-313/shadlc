import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  type = "button",
  size = "md",
  backgroundColor,
  textColor,
  borderColor,
  hoverBgColor,
  hoverTextColor,
  hoverBorderColor,
  fullWidth = false,
  disabled = false,
  loading = false,
  iconBefore,
  iconAfter,
  onClick,
}) => {
  const baseStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500",
    borderRadius: "6px",
    transition: "all 0.3s ease-in-out",
    cursor: disabled ? "not-allowed" : "pointer",
    width: fullWidth ? "100%" : "auto",
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
    border: borderColor ? `1px solid ${borderColor}` : "none",
  };

  const hoverStyles: React.CSSProperties = {
    backgroundColor: hoverBgColor || undefined,
    color: hoverTextColor || undefined,
    borderColor: hoverBorderColor || undefined,
  };

  // Size styles
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: "6px 12px", fontSize: "14px" },
    md: { padding: "8px 16px", fontSize: "16px" },
    lg: { padding: "10px 20px", fontSize: "18px" },
  };

  return (
    <button
      type={type}
      className={`${className}`}
      style={{ ...baseStyles, ...sizeStyles[size] }}
      onClick={!disabled && !loading ? onClick : undefined}
      disabled={disabled}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyles);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, baseStyles);
      }}
    >
      {loading ? (
        <span
          style={{
            width: "20px",
            height: "20px",
            border: "3px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></span>
      ) : (
        <>
          {iconBefore && <span style={{ marginRight: "8px" }}>{iconBefore}</span>}
          {children}
          {iconAfter && <span style={{ marginLeft: "8px" }}>{iconAfter}</span>}
        </>
      )}
    </button>
  );
};
