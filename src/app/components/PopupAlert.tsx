"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

interface PopupAlertProps {
  alertMessage: string;
}

const PopupAlert: React.FC<PopupAlertProps> = ({ alertMessage }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] backdrop-blur">
      <div className="relative border-2 border-[#F2F0E4]/30 light-text p-5 rounded-3xl shadow-lg w-2/3 md:w-1/3">
        <h3 className="text-xl mb-4">{alertMessage}</h3>
        <div className="flex justify-end">
          <Button onClick={() => setIsVisible(false)}>Dismiss</Button>
        </div>
      </div>
    </div>
  );
};

export default PopupAlert;
