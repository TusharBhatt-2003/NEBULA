"use client";
import Link from "next/link";
import useUser from "./hooks/useUser";
import Feed from "./components/feed";
import { Button } from "./components/ui/button";
import NEBULA from "./components/NEBULA";
import { useState } from "react";

export default function Home() {
  const { user } = useUser();

  const paragraph = [
    "A space where ideas, connections, and",
    "creativity come together like",
    "stars forming in a cosmic cloud.",
  ];

  // State to track the hovered word
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  return (
    <div className="relative overflow-hidden">
      {!user ? (
        <div className="relative font-['spring'] gap-10 flex flex-col bg-black h-screen items-center justify-around overflow-hidden">
          <div className="absolute w-screen h-screen">
            <NEBULA />
          </div>

          <div className="relative z-10  backdrop-blur gap-5 py-5 px-10 rounded-xl border border-[#F2F0E4]/30 w-[90%] md:w-[40%] lg:w-[30%] text-center space-y-2 overflow-hidden">
            <div className="grain"></div>
            {paragraph.map((line, index) => (
              <p key={index} className="relative text-xl">
                {line.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={`inline-block mx-1 cursor-pointer ${
                      hoveredWord === word
                        ? "text-transparent bg-clip-text animate-gradient-para"
                        : "light-text"
                    }`}
                    onMouseEnter={() => setHoveredWord(word)}
                    onMouseLeave={() => setHoveredWord(null)}
                  >
                    {word}{" "}
                  </span>
                ))}
              </p>
            ))}
          </div>

          <div className="relative flex backdrop-blur gap-5 py-5 px-10 rounded-xl border border-[#F2F0E4]/30 z-10 flex-col items-center justify-center overflow-hidden">
            <div className="grain"></div>
            <Link href="/login">
              <Button className="light-bg" variant="outline">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="border bg-transparent">Signup</Button>
            </Link>
          </div>
        </div>
      ) : (
        <Feed />
      )}
    </div>
  );
}
