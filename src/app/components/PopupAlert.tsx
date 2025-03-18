"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface PopupAlertProps {
  alertMessage: string;
}

const PopupAlert: React.FC<PopupAlertProps> = ({ alertMessage }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-32 right-0 left-0 flex items-center justify-center z-[999]">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex items-end border-2 border-[#F2F0E4]/30 light-text p-5 rounded-3xl shadow-lg w-2/3 md:w-1/3"
      >
        <h3 className="text-xl mb-4">{alertMessage}</h3>
        <div className="flex justify-end">
          <Button onClick={() => setIsVisible(false)}>Dismiss</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PopupAlert;
