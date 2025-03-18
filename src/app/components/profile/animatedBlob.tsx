"use client";

import { useImageColors } from "@/app/hooks/useImageColors";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "motion/react";

interface BlobProps {
  imageUrl: string;
}

export default function AnimatedBlob({ imageUrl }: BlobProps) {
  const { palette, isLoading } = useImageColors(imageUrl);
  const blobRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!blobRef.current || viewport.width === 0) return;

    const blob = blobRef.current;
    const blobSize = 200; // match lg:w-[400px]
    const maxX = viewport.width - blobSize;
    const maxY = viewport.height - blobSize;

    const animateBlob = () => {
      gsap.to(blob, {
        x: gsap.utils.random(0, maxX),
        y: gsap.utils.random(0, maxY),
        duration: gsap.utils.random(8, 15),
        ease: "sine.inOut",
        onComplete: animateBlob,
      });
    };

    // Initial random position
    gsap.set(blob, {
      x: gsap.utils.random(0, maxX),
      y: gsap.utils.random(0, maxY),
    });

    animateBlob();
  }, [viewport]);

  if (isLoading || !palette) return null;

  const gradientColors = [
    palette.Vibrant,
    palette.LightVibrant,
    palette.Muted,
    palette.DarkVibrant,
  ];

  const gradientStyle = {
    backgroundImage: `radial-gradient(circle at center, ${gradientColors.join(", ")})`,
  };

  return (
    <motion.div
      ref={blobRef}
      className="fixed top-0 right-0 bottom-0 left-0 w-[200px] h-[200px] blur-3xl z-0  opacity-60 rounded-full pointer-events-none"
      style={gradientStyle}
      animate={{
        scale: [1, 1.05, 1],
        skewX: [0, 50, -50, 0],
        skewY: [0, -20, 20, 0],
      }}
      transition={{
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        damping: 5,
      }}
    />
  );
}
