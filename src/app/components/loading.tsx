import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex py-5 px-1 justify-center items-center">
      {[0.8, 1.2, 1.6, 2, 2.4].map((delay, index) => (
        <motion.div
          key={index}
          className="w-4 h-4 rounded-full animate-gradient"
          style={{
            background:
              "linear-gradient(45deg, #9e120e, #0b8e60, #30568c, #f9ce79, #981696, #639438)",
            backgroundSize: "200% 200%",
          }}
          animate={{ scale: [0.5, 1.5, 0.8] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "mirror",
            delay,
          }}
        />
      ))}
    </div>
  );
};

export default Loading;
