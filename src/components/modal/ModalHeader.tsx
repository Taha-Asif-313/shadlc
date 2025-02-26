import React from "react";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button className="text-gray-500" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};
