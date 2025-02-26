import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode; // Optional icon
}

interface DropdownProps {
  options: Option[];
  value?: string; // Controlled value
  defaultValue?: string; // Uncontrolled value
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  className?: string;
  iconPrefix?: React.ReactNode;
  iconSuffix?: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value, // Controlled value
  defaultValue, // Uncontrolled value
  onChange,
  placeholder = "Select an option",
  disabled = false,
  borderColor = "border-gray-300",
  backgroundColor = "bg-white",
  textColor = "text-gray-800",
  padding = "p-3",
  margin = "mb-4",
  className = "",
  iconPrefix,
  iconSuffix,
}) => {
  // If `value` is provided, it's controlled, otherwise use state (uncontrolled)
  const [selected, setSelected] = useState<string | undefined>(defaultValue);
  const [open, setOpen] = useState(false);

  const handleSelect = (val: string) => {
    setSelected(val); // Update state for uncontrolled usage
    setOpen(false);
    if (onChange) onChange(val); // Trigger callback if provided
  };

  return (
    <div className={`relative w-full ${margin} ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={disabled}
        className={`w-full flex items-center justify-between ${padding} ${borderColor} ${backgroundColor} ${textColor} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <div className="flex items-center">
          {iconPrefix && <span className="mr-2 text-gray-500">{iconPrefix}</span>}
          <span>{value ?? selected ? options.find((o) => o.value === (value ?? selected))?.label : placeholder}</span>
        </div>
        {iconSuffix || <span className="ml-2 text-gray-500">▼</span>}
      </button>

      {/* Dropdown List */}
      {open && (
        <ul
          className={`absolute z-10 w-full ${backgroundColor} ${borderColor} rounded-lg shadow-md mt-1 max-h-60 overflow-auto`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100"
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
