"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LightSpeedAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 400 }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
    }));

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "white";
      stars.forEach((star) => {
        star.z -= 5;
        if (star.z <= 0) star.z = width;

        const k = 100.0 / star.z;
        const sx = star.x * k + width / 2;
        const sy = star.y * k + height / 2;

        if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
          const size = (1 - star.z / width) * 2;
          ctx.fillRect(sx, sy, size, size);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    let animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Fade out the animation after 2 seconds
    gsap.to(canvas, {
      opacity: 0,
      duration: 5,
      delay: 1,
      onComplete: () => {
        cancelAnimationFrame(animationFrameId);
        setShowAnimation(false);
      },
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!showAnimation) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-50"
      style={{ backgroundColor: "black" }}
    />
  );
};

export default LightSpeedAnimation;
