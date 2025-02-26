import React from "react";

interface Option {
  label: string;
  value: string;
}

interface CheckRadioProps {
  type: "checkbox" | "radio";
  name?: string; // Required for radio groups
  options: Option[]; // Array of options
  selectedValues?: string[] | string; // Checked values (for radio: single string, for checkbox: array)
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
  customIcon?: (checked: boolean) => React.ReactNode; // Custom Icon
}

export const CheckRadio: React.FC<CheckRadioProps> = ({
  type,
  name,
  options,
  selectedValues,
  onChange,
  disabled = false,
  readOnly = false,
  required = false,
  error,
  className = "",
  customIcon,
}) => {
  const isCheckbox = type === "checkbox";

  const handleChange = (value: string) => {
    if (onChange) {
      if (isCheckbox) {
        // Handle checkbox selection
        const updatedValues = Array.isArray(selectedValues)
          ? selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value]
          : [value];
        onChange(updatedValues);
      } else {
        // Handle radio selection
        onChange(value);
      }
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {options.map((option) => {
        const isChecked = isCheckbox
          ? Array.isArray(selectedValues) && selectedValues.includes(option.value)
          : selectedValues === option.value;

        return (
          <label
            key={option.value}
            className={`flex items-center space-x-2 cursor-pointer p-2 ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {/* Custom Icon or Default */}
            {customIcon ? (
              customIcon(isChecked)
            ) : (
              <span
                className={`flex justify-center items-center w-5 h-5 border ${
                  isChecked ? "bg-blue-500 border-blue-500" : "border-gray-400"
                } rounded-${isCheckbox ? "md" : "full"}`}
              >
                {isChecked && <span className="w-3 h-3 bg-white rounded-full" />}
              </span>
            )}

            {/* Input (Hidden) */}
            <input
              type={type}
              name={name}
              value={option.value}
              checked={isChecked}
              disabled={disabled || readOnly}
              required={required}
              onChange={() => handleChange(option.value)}
              className="hidden"
            />

            {/* Label Text */}
            <span className="text-gray-700">{option.label}</span>
          </label>
        );
      })}

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
