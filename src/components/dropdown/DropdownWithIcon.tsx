import React from "react";

interface DropdownWithIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export const DropdownWithIcon: React.FC<DropdownWithIconProps> = ({ icon, label, onClick }) => {
  return (
    <button className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-200" onClick={onClick}>
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
};
