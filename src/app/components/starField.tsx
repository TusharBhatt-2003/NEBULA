"use client";
import { useEffect, useRef } from "react";

interface StarFieldProps {
  count?: number;
}

const StarField: React.FC<StarFieldProps> = ({ count = 150 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 150}vw`; // Spread stars over a larger area
      star.style.top = `${Math.random() * 150}vh`;
      container.appendChild(star);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 100;
      const y = (e.clientY / innerHeight) * 100;

      container.style.transform = `translate(-${x / 10}%, -${y / 10}%)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [count]);

  return (
    <div ref={containerRef} className="absolute w-[150vw] h-[150vh] "></div>
  );
};

export default StarField;
