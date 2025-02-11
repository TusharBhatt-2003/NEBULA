"use client";

import React from "react";

interface ConfirmationModalProps {
  sentence: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  sentence,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className="bg-[#F3DDCF] text-[#C16270] p-5 rounded-md shadow-lg w-2/3 md:w-1/3">
        <h3 className="text-xl mb-4">{sentence}</h3>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-[#B71A45] text-[#F9C7C5] p-1 md:py-2 md:px-4 rounded-md"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="bg-[#F9ECE3] text-[#F9C7C5] p-1 md:py-2 md:px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
