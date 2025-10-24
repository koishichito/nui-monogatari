
import React from 'react';

interface ChoiceButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ onClick, children, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full text-left p-4 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
    >
      {children}
    </button>
  );
};

export default ChoiceButton;
