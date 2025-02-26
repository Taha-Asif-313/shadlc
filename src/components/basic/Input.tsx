import React, { useState } from "react";

interface InputProps {
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
  placeholder?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  success?: boolean;
  autoFocus?: boolean;
  clearable?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  label,
  value,
  defaultValue,
  onChange,
  disabled = false,
  readOnly = false,
  required = false,
  error,
  success = false,
  autoFocus = false,
  clearable = false,
  iconLeft,
  iconRight,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue || "");
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    if (onChange) onChange("");
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 ">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative w-full">
        {/* Left Icon */}
        {iconLeft && (
          <span className="absolute left-3 top-2.5">{iconLeft}</span>
        )}

        {/* Input Field */}
        <input
          type={
            type === "password"
              ? isPasswordVisible
                ? "text"
                : "password"
              : type
          }
          value={value ?? inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
            iconLeft ? "pl-10" : ""
          } ${iconRight || clearable || type === "password" ? "pr-10" : ""} ${
            error
              ? "border-red-500 focus:ring-1 focus:ring-red-400"
              : success
              ? "border-green-500 focus:ring-1 focus:ring-green-400"
              : "border-gray-300 focus:ring-1 focus:ring-blue-400"
          }`}
        />

        {/* Right Icon */}
        {iconRight && type !== "password" && !clearable && (
          <span className="absolute right-3 top-2.5">{iconRight}</span>
        )}

        {/* Clear Button */}
        {clearable && inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}

        {/* Password Toggle Button */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          >
            {isPasswordVisible ? ( // Eye-Off SVG (Hide Password)
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.073 12.194 4.212 8.333c-1.52 1.657-2.096 3.317-2.106 3.351L2 12l.105.316C2.127 12.383 4.421 19 12.054 19c.929 0 1.775-.102 2.552-.273l-2.746-2.746a3.987 3.987 0 0 1-3.787-3.787zM12.054 5c-1.855 0-3.375.404-4.642.998L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.298-3.298c2.638-1.953 3.579-4.637 3.593-4.679l.105-.316-.105-.316C21.98 11.617 19.687 5 12.054 5zm1.906 7.546c.187-.677.028-1.439-.492-1.96s-1.283-.679-1.96-.492L10 8.586A3.955 3.955 0 0 1 12.054 8c2.206 0 4 1.794 4 4a3.94 3.94 0 0 1-.587 2.053l-1.507-1.507z"></path>
              </svg> // Eye SVG (Show Password)
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12s3.75-6 9-6 9 6 9 6-3.75 6-9 6-9-6-9-6z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
};
