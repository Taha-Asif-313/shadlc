import React from "react";

interface InteractiveCardProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({ onClick, children }) => {
  return (
    <div
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
