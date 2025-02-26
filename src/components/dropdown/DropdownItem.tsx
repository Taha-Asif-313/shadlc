import React from "react";

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick, className }) => {
  return (
    <button
      className={`w-full text-left px-4 py-2 hover:bg-gray-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
