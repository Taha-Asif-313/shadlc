import React from "react";

interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return <div className="border-t pt-2 flex justify-end gap-2">{children}</div>;
};
