"use client";
import { motion } from "motion/react";
import GrainContainer from "./grainContainer";

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <GrainContainer>
      <h1 className="overflow-hidden p-2 flex justify-center relative z-10 light-text font-semibold border-none rounded-3xl text-center font-['spring'] text-light text-lg">
        {text.split("  ").map((letter, index) => (
          <motion.div
            key={index}
            className="text-transparent bg-clip-text animate-gradient-para"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {letter}
          </motion.div>
        ))}
      </h1>
    </GrainContainer>
  );
};

export default AnimatedText;
