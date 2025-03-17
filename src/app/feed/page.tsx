"use client";
import React from "react";
import Feed from "../components/feed";
import AnimatedText from "../components/animatedText";
import GrainContainer from "../components/grainContainer";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Page() {
  const text = "The posts from the tags you follow will appear here.";

  return (
    <div className="relative overflow-hidden">
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
      <GrainContainer className="flex font-['spring'] justify-between items-center">
        <h2>
          WHAT IS{" "}
          <span className="font-['LogoFont'] text-transparent bg-clip-text animate-gradient">
            NEBULA
          </span>{" "}
          ?
        </h2>
        <Link href="/what-is-nebula">
          <Button className="">
            <div className="w-10 h-10">
              <DotLottieReact
                src="https://lottie.host/f4826d64-fd6a-4591-9797-a420aa7a560e/VOz16Ffzwk.lottie"
                loop
                autoplay
              />
            </div>
          </Button>
        </Link>
      </GrainContainer>
      <AnimatedText text={text} />
      <Feed />
    </div>
  );
}
