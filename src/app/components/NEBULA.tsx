"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import StarField from "./starField";

export default function NEBULA() {
  const textRef = useRef<HTMLDivElement>(null);
  const text = "NEBULA";

  useEffect(() => {
    const chars = gsap.utils.toArray<HTMLSpanElement>(".char");
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Animation to bring characters in one by one
    tl.fromTo(
      chars,
      { opacity: 1, scale: 0, x: 0, y: 0 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 2,
        ease: "power4.out",
        stagger: 0.1,
      },
    );

    // Scatter characters randomly off-screen
    tl.to(chars, {
      opacity: 0.5,
      x: () => gsap.utils.random(-window.innerWidth, window.innerWidth),
      y: () => gsap.utils.random(-window.innerHeight, window.innerHeight),
      rotation: () => gsap.utils.random(-360, 360),
      duration: 10,
      scale: 2.5,
      ease: "power4.inout",
      filter: "blur(15px)",
    });

    gsap.to(chars, {
      backgroundPosition: "100% 0",
      duration: 1,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div className="nebula-container h-full w-full overflow-hidden flex flex-col items-center justify-center bg-black relative">
      <StarField />
      <div ref={textRef} className="flex">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="char font-['LogoFont'] lg:p-5 text-8xl text-transparent bg-clip-text animate-gradient"
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
