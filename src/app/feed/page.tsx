"use client";
import React from "react";
import { motion } from "motion/react";
import Feed from "../components/feed";
import AnimatedText from "../components/animatedText";

export default function Page() {
  const text = "The posts from the tags you follow will appear here.";

  return (
    <div className="relative overflow-hidden">
      <AnimatedText text={text} />
      <Feed />
    </div>
  );
}
