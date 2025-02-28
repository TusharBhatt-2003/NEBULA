"use client";
import React from "react";
import { motion } from "motion/react";

export default function Logo() {
  return (
    <div className="relative  w-72 h-72 p-5 flex items-center justify-center">
      <img
        className="absolute w-1"
        src="/nebula-logo-components/center-star.svg"
      />

      <motion.img
        className="absolute blur  w-36 inset-0 m-auto"
        src="/nebula-logo-components/spiral1.svg"
        animate={{ rotate: 360, scale: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      />

      <motion.img
        className="absolute blur-xl opacity-50 w-46 inset-0 m-auto"
        src="/nebula-logo-components/spiral2.svg"
        animate={{ rotate: 360, scale: [2, 1.3, 2] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />

      <motion.img
        className="absolute  blur opacity-40 w-56 inset-0 m-auto"
        src="/nebula-logo-components/spiral3.svg"
        animate={{ rotate: 360, scale: [1, 2, 1] }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      />

      <motion.img
        className="absolute animate-ping opacity-40  blur w-64 inset-0 m-auto"
        src="/nebula-logo-components/spiral4.svg"
        animate={{ rotate: 360, scale: [0.5, 1.5, 0.5] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />
    </div>
  );
}
