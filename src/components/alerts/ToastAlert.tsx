import React, { useState } from "react";

interface ToastAlertProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number; // in milliseconds
  className?: string;
}

export const ToastAlert: React.FC<ToastAlertProps> = ({
  type = "info",
  message,
  duration = 3000,
  className = "",
}) => {
  const [visible, setVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const alertStyles: Record<string, string> = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
  };

  if (!visible) return null;

  return (
    <div className={`fixed top-5 right-5 p-4 rounded shadow-lg ${alertStyles[type]} ${className}`}>
      {message}
    </div>
  );
};
