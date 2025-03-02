import React, { useState, useEffect, useRef } from "react";

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  padding?: string;
  margin?: string;
  dropdownWidth?: string;
  dropdownHeight?: string;
  borderRadius?: string;
  shadow?: string;
  className?: string;
  iconPrefix?: React.ReactNode;
  iconSuffix?: React.ReactNode;
  optionPadding?: string;
  optionGap?: string;
  openAnimation?: string;
  closeAnimation?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  borderColor = "border border-gray-300",
  backgroundColor = "bg-white",
  textColor = "text-gray-800",
  hoverColor = "hover:bg-gray-100",
  padding = "p-3",
  margin = "mb-4",
  dropdownWidth = "w-full",
  dropdownHeight = "max-h-60",
  borderRadius = "rounded-lg",
  shadow = "shadow-md",
  className = "",
  iconPrefix,
  iconSuffix,
  optionPadding = "px-4 py-2",
  optionGap = "gap-2",
  openAnimation = "animate-fadeIn",
  closeAnimation = "animate-fadeOut",
}) => {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    setSelected(val);
    setOpen(false);
    if (onChange) onChange(val);
  };

  return (
    <div ref={dropdownRef} className={`relative ${dropdownWidth} ${margin} ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={disabled}
        className={`flex items-center justify-between ${padding} ${borderColor} ${backgroundColor} ${textColor} ${borderRadius} ${shadow} focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <div className={`flex items-center ${optionGap}`}>
          {iconPrefix && <span className="text-gray-500">{iconPrefix}</span>}
          <span>
            {value ?? selected ? options.find((o) => o.value === (value ?? selected))?.label : placeholder}
          </span>
        </div>
        {iconSuffix || <span className="ml-2 text-gray-500">▼</span>}
      </button>

      {/* Dropdown List */}
      {open && (
        <ul
          className={`absolute z-10 ${dropdownWidth} ${backgroundColor} ${borderColor} ${borderRadius} ${shadow} mt-1 overflow-auto ${dropdownHeight} ${
            open ? openAnimation : closeAnimation
          }`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`flex items-center ${optionPadding} cursor-pointer ${hoverColor}`}
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
