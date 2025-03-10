"use client";

import React from "react";
import { Button } from "./ui/button";

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
    <div className="fixed backdrop-blur rounded-xl  overflow-hidden inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-[999]">
      <div className="relative overflow-hidden border-2 border-[#F2F0E4]/30 light-text p-5 rounded-3xl shadow-lg w-2/3 md:w-1/3">
        <div className="grain"></div>
        <h3 className="text-xl mb-4">{sentence}</h3>
        <div className="flex justify-between">
          <Button onClick={onConfirm} className="" variant="outline">
            Confirm
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
