"use client";
import { motion } from "motion/react";

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <h1 className="overflow-hidden m-5 mb-0 flex justify-center relative border-[#F2F0E4]/30 z-10 backdrop-blur-[2px] p-3 light-text font-semibold border rounded-3xl text-center font-['spring'] text-light text-lg">
      <div className="grain"></div>
      {text.split("  ").map((letter, index) => (
        <motion.div
          key={index}
          className="text-transparent bg-clip-text animate-gradient-para"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }} // Optional: delays the animation for each letter
        >
          {letter}
        </motion.div>
      ))}
    </h1>
  );
};

export default AnimatedText;
