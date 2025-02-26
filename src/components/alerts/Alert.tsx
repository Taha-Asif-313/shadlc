import React, { useState } from "react";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  dismissible?: boolean;
  duration?: number; // Auto-close duration in milliseconds
  colors?: {
    bg?: string;
    text?: string;
    border?: string;
    icon?: string;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  message,
  type = "info",
  dismissible = true,
  duration,
  colors,
  icon,
  className = "",
}) => {
  const [visible, setVisible] = useState(true);

  const typeColors = {
    success: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-500",
      icon: "🟢",
    },
    error: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-500",
      icon: "🔴",
    },
    warning: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-500",
      icon: "🟡",
    },
    info: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-500",
      icon: "🔵",
    },
  };

  const alertColors = {
    bg: colors?.bg || typeColors[type].bg,
    text: colors?.text || typeColors[type].text,
    border: colors?.border || typeColors[type].border,
    icon: colors?.icon || typeColors[type].icon,
  };

  React.useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`flex items-center p-4 border-l-4 rounded-lg shadow-md transition-opacity duration-500 ${alertColors.bg} ${alertColors.text} ${alertColors.border} ${className}`}
    >
      <span className="mr-3 text-lg">{icon || alertColors.icon}</span>
      <p className="flex-1">{message}</p>
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className="ml-3 text-lg font-bold opacity-70 hover:opacity-100"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="30px"
            width="30px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};
