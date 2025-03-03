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
      star.style.left = `${Math.random() * 150}vw`;
      star.style.top = `${Math.random() * 150}vh`;
      container.appendChild(star);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 100;
      const y = (e.clientY / innerHeight) * 100;
      container.style.transform = `translate(-${x / 10}%, -${y / 10}%)`;
    };

    const handleDeviceMotion = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null && event.beta !== null) {
        const x = event.gamma; // Left/Right tilt
        const y = event.beta; // Front/Back tilt

        container.style.transform = `translate(${x / 2}%, ${y / 2}%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("deviceorientation", handleDeviceMotion);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceMotion);
    };
  }, [count]);

  return (
    <div ref={containerRef} className="absolute w-[950vw] h-[950vh]"></div>
  );
};

export default StarField;
