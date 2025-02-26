import React from "react";

interface BadgeProps {
  text: string;
  color?: string;
  textColor?: string;
  borderColor?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "soft";
  rounded?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  color = "bg-blue-500",
  textColor = "text-white",
  borderColor = "border-blue-500",
  icon,
  iconPosition = "left",
  size = "md",
  variant = "solid",
  rounded = false,
  className = "",
}) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const variantClasses = {
    solid: `${color} ${textColor}`,
    outline: `border ${borderColor} ${textColor} bg-transparent`,
    soft: `${color} bg-opacity-20 ${textColor}`,
  };

  return (
    <span
      className={`inline-flex items-center ${
        rounded ? "rounded-full" : "rounded-md"
      } ${sizeClasses[size]} ${variantClasses[variant]} font-medium ${className}`}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {text}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </span>
  );
};
