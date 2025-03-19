import React, { ReactNode } from 'react';

// Define the props for the Modal component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayClass?: string;
  modalClass?: string;
  closeButtonClass?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  overlayClass = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center',
  modalClass = 'bg-white rounded-lg p-6 w-11/12 max-w-md',
  closeButtonClass = 'absolute top-2 right-2 text-gray-500 hover:text-gray-700',
}) => {
  if (!isOpen) return null;

  return (
    <div className={overlayClass}>
      <div className={`relative ${modalClass}`}>
        {/* Close Button */}
        <button onClick={onClose} className={closeButtonClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};
