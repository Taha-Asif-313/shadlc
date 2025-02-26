import React, { useState } from "react";

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onLabel?: string;
  offLabel?: string;
  onColor?: string;
  offColor?: string;
  size?: "small" | "medium" | "large";
  className?: string;
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  onLabel = "",
  offLabel = "",
  onColor = "bg-green-500",
  offColor = "bg-gray-400",
  size = "medium",
  className = "",
  onIcon,
  offIcon,
}) => {
  const [isOn, setIsOn] = useState(checked);

  const toggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onChange) onChange(newState);
  };

  // Size classes
  const sizes = {
    small: "w-10 h-5 text-xs",
    medium: "w-14 h-7 text-sm",
    large: "w-20 h-10 text-base",
  };

  return (
    <button
      onClick={toggle}
      className={`relative flex items-center ${sizes[size]} rounded-full transition-all ${
        isOn ? onColor : offColor
      } ${className}`}
    >
      {/* Label (Left for On, Right for Off) */}
      <span
        className={`absolute transition-all ${
          isOn ? "left-1 text-white" : "right-1 text-gray-700"
        }`}
      >
        {isOn ? onIcon || onLabel : offIcon || offLabel}
      </span>

      {/* Toggle Circle */}
      <div
        className={`absolute bg-white rounded-full shadow-md transition-all ${
          size === "small" ? "w-4 h-4" : size === "large" ? "w-8 h-8" : "w-6 h-6"
        } ${isOn ? "right-1" : "left-1"}`}
      />
    </button>
  );
};
