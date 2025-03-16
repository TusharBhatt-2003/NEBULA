import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

interface TagLinkProps {
  tag: string;
  index: number;
}

const TagLink: React.FC<TagLinkProps> = ({ tag, index }) => {
  return (
    <Link
      key={index}
      href={`/tag/${tag}`}
      className="flex justify-center items-center"
    >
      <motion.p
        whileTap={{ scale: 0.8 }}
        initial={{ opacity: 1, y: 0, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: "easeIn",
          type: "spring",
          damping: 10,
        }}
        className="light-bg lowercase z-[99] text-black font-bold py-1 px-2 text-sm rounded-xl"
      >
        {tag}
      </motion.p>
    </Link>
  );
};

export default TagLink;
