import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
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
  variant = "primary",
  size = "md",
  backgroundColor,
  textColor,
  borderColor,
  fullWidth = false,
  disabled = false,
  loading = false,
  iconBefore,
  iconAfter,
  onClick,
}) => {
  const baseStyles =
    "flex items-center justify-center font-medium rounded-md transition-all focus:outline-none";

  // Default styles based on variants
  const variants = {
    primary: `bg-blue-500 text-white hover:bg-blue-600`,
    secondary: `bg-gray-500 text-white hover:bg-gray-600`,
    outline: `border border-gray-500 text-gray-700 hover:bg-gray-100`,
    link: `text-blue-500 hover:underline`,
  };

  // Size styles
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      style={{
        backgroundColor: backgroundColor || undefined,
        color: textColor || undefined,
        borderColor: borderColor || undefined,
      }}
      onClick={!disabled && !loading ? onClick : undefined}
      disabled={disabled}
    >
      {loading ? (
        <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
      ) : (
        <>
          {iconBefore && <span className="mr-2">{iconBefore}</span>}
          {children}
          {iconAfter && <span className="ml-2">{iconAfter}</span>}
        </>
      )}
    </button>
  );
};
