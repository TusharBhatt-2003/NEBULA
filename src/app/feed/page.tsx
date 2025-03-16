"use client";
import React from "react";
import Feed from "../components/feed";
import AnimatedText from "../components/animatedText";
import GrainContainer from "../components/grainContainer";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Page() {
  const text = "The posts from the tags you follow will appear here.";

  return (
    <div className="relative overflow-hidden">
      <GrainContainer className="flex font-['spring'] justify-between items-center">
        <h2>
          WHAT IS{" "}
          <span className="font-['LogoFont'] text-transparent bg-clip-text animate-gradient">
            NEBULA
          </span>{" "}
          ?
        </h2>
        <Link href="/what-is-nebula">
          <Button className="px-6 font-['spring'] py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition">
            <FiArrowRight className="text-xl" />
          </Button>
        </Link>
      </GrainContainer>
      <AnimatedText text={text} />
      <Feed />
    </div>
  );
}
