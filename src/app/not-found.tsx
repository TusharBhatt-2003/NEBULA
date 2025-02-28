"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import StarField from "./components/starField";
import Logo from "./components/logo/logo";

export default function NotFound() {
  const logoRef = useRef(null);

  useEffect(() => {
    const moveLogoRandomly = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      gsap.to(logoRef.current, {
        x: () => gsap.utils.random(0, vw - 200, 1),
        y: () => gsap.utils.random(0, vh - 200, 1),
        duration: 20,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    moveLogoRandomly();

    window.addEventListener("resize", moveLogoRandomly);

    return () => window.removeEventListener("resize", moveLogoRandomly);
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center flex-col gap-5 items-center relative overflow-hidden">
      <StarField />
      <div
        className="flex z-10 absolute gap-5"
        ref={logoRef}
        style={{ position: "absolute" }}
      >
        <Logo />
      </div>
      <div className="relative z-10 backdrop-blur gap-5 py-10 rounded-xl border border-[#F2F0E4]/30 w-[90%] md:w-[40%] lg:w-[30%] text-center space-y-2 overflow-hidden light-text">
        <div className="grain"></div>
        <h1 className="m-1 font-['big'] font-semibold text-7xl text-transparent bg-clip-text animate-gradient-para">
          404
        </h1>
        <p>
          The page you are looking for does not exist, <br /> or <br /> is under
          development.
        </p>
      </div>
    </div>
  );
}
