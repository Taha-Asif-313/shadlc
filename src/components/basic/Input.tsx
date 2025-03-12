import React, { useState } from "react";
import { FiEye, FiEyeOff, FiX } from "react-icons/fi";

interface InputProps {
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
  placeholder?: string;
  label?: string;
  name?: string;
  labelClassname?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (name: string, value: string) => void;
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
  borderColor?: string;
  focusBorderColor?: string;
  hoverBorderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  errorColor?: string;
  successColor?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  label,
  value,
  defaultValue,
  onChange,
  labelClassname,
  name = "",
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
  borderColor = "#ccc",
  focusBorderColor = "#007bff",
  hoverBorderColor = "#666",
  backgroundColor = "#fff",
  textColor = "#000",
  errorColor = "#e53e3e",
  successColor = "#38a169",
}) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue || "");
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e.target.name, e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    if (onChange) onChange(name, "");
  };

  const inputStyles: React.CSSProperties = {
    width: "100%",
    padding: "8px 16px",
    border: `1px solid ${error ? errorColor : success ? successColor : borderColor}`,
    borderRadius: "6px",
    backgroundColor,
    color: textColor,
    transition: "all 0.3s ease-in-out",
    outline: "none",
  };

  return (
    <div style={{ width: "100%" }} className={className}>
      {label && (
        <label
          className={labelClassname}
          style={{ marginBottom: "5px", display: "block", fontSize: "14px", fontWeight: "500", color: textColor }}
        >
          {label} {required && <span style={{ color: errorColor }}>*</span>}
        </label>
      )}

      <div style={{ position: "relative", width: "100%" }}>
        {iconLeft && (
          <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}>
            {iconLeft}
          </span>
        )}

        <input
          type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
          name={name}
          value={value ?? inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          style={{
            ...inputStyles,
            paddingLeft: iconLeft ? "36px" : "16px",
            paddingRight: iconRight || clearable || type === "password" ? "36px" : "16px",
          }}
        />

        {iconRight && type !== "password" && !clearable && (
          <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}>
            {iconRight}
          </span>
        )}

        {clearable && inputValue && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              color: "#666",
              cursor: "pointer",
            }}
          >
            <FiX size={16} />
          </button>
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={() => setPasswordVisible(!isPasswordVisible)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              color: "#666",
              cursor: "pointer",
            }}
          >
            {isPasswordVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>

      {error && <p style={{ fontSize: "12px", color: errorColor, marginTop: "4px" }}>{error}</p>}
    </div>
  );
};
