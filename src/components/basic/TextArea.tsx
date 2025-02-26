import React, { useState } from "react";

interface TextAreaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  resize?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  className?: string;
  iconPrefix?: React.ReactNode;
  iconSuffix?: React.ReactNode;
  showCharacterCount?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder = "Type here...",
  rows = 4,
  cols,
  maxLength,
  resize = true,
  borderColor = "border-gray-300",
  backgroundColor = "bg-white",
  textColor = "text-gray-800",
  padding = "p-3",
  margin = "mb-4",
  className = "",
  iconPrefix,
  iconSuffix,
  showCharacterCount = true,
}) => {
  const [text, setText] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) return;
    setText(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className={`relative w-full ${margin} ${className}`}>
      <div className="relative flex items-center">
        {/* Prefix Icon */}
        {iconPrefix && <div className="absolute left-3 text-gray-500">{iconPrefix}</div>}

        {/* TextArea */}
        <textarea
          value={text}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          cols={cols}
          className={`w-full ${padding} ${borderColor} ${backgroundColor} ${textColor} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${resize ? "resize" : "resize-none"} ${iconPrefix ? "pl-10" : ""} ${iconSuffix ? "pr-10" : ""}`}
        />

        {/* Suffix Icon */}
        {iconSuffix && <div className="absolute right-3 text-gray-500">{iconSuffix}</div>}
      </div>

      {/* Character Counter */}
      {showCharacterCount && maxLength && (
        <div className="text-right text-xs text-gray-500 mt-1">
          {text.length}/{maxLength}
        </div>
      )}
    </div>
  );
};
