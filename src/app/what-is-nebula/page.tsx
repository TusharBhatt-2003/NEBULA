"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarField from "../components/starField";
import { Button } from "../components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const WhatIsNebulaPage = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const features = [
    {
      title: "Post Freely",
      description: "Share images, GIFs, and text. Your creativity, your way.",
    },
    {
      title: "Follow Tags",
      description:
        "Stay focused on content, not people. Follow what inspires you.",
    },
    {
      title: "Cosmic UI",
      description: "Clean, space-themed design with a focus on your content.",
    },
  ];

  useEffect(() => {
    if (cardsRef.current.length > 0) {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            ease: "power2.out",
          },
        );
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-light overflow-hidden">
      <div className="fixed">
        <StarField />
      </div>

      {/* Header Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-12">
        <motion.h1
          initial={{ opacity: 1, y: -10, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-['spring'] md:text-6xl font-bold "
        >
          What is{" "}
          <span className="font-['LogoFont'] text-transparent bg-clip-text animate-gradient">
            NEBULA
          </span>{" "}
          ?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-[#F2F0E4]/70"
        >
          In a universe full of noise,{" "}
          <span className="text-[#F2F0E4] font-semibold ">Nebula</span> is your
          space to shine. A social platform for creators, thinkers, and
          dreamers—where you can share artwork, photography, quotes, and
          thoughts in images, GIFs, or text.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-8 max-w-3xl text-[#F2F0E4]/60 text-md md:text-lg"
        >
          <p>
            But here’s the twist:{" "}
            <span className="text-[#F2F0E4] font-medium">
              You follow tags, not people
            </span>
            . Discover content based on your interests, not who posts it. No
            clutter. No algorithms. Just pure, cosmic creativity.
          </p>
          <p className="mt-4">
            Join Nebula, post freely, and follow what truly inspires you. Every
            post is a star—let yours shine.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10"
        >
          <Link href="/search">
            <Button className="px-6 font-['spring'] py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition">
              Explore Nebula
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Features Section with GSAP Scroll Animation */}
      <div className="relative z-10 px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="overflow-hidden relative p-5 border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[2px] light-text border rounded-3xl"
            >
              <div className="grain" />
              <h3 className="text-xl font-['spring'] font-semibold text-light mb-2">
                {feature.title}
              </h3>
              <p className="text-light font-semibold">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Manifesto Section */}
      <div className="relative z-10 px-6 pb-32">
        <div className="max-w-4xl mx-auto border border-[#F2F0E4]/30 backdrop-blur-[2px] rounded-3xl p-6 md:p-10">
          <div className="grain" />
          <h2 className="text-2xl md:text-3xl font-['spring'] font-bold text-light mb-4">
            Manifesto: What’s Coming Next
          </h2>
          <ul className="list-disc list-inside space-y-4 text-[#F2F0E4]/80 font-medium">
            <li>
              <span className="text-light font-semibold">Comments Section</span>
              : Engage with the community by adding thoughts, reactions, and
              conversations under every post.
            </li>
            <li>
              <span className="text-light font-semibold">Video Uploads</span>:
              Express more with seamless support for short-form and long-form
              video content.
            </li>
            <li>
              <span className="text-light font-semibold">Notifications</span>:
              Stay updated with real-time alerts on tags you follow, post
              interactions, and platform updates.
            </li>
            <li>
              <span className="text-light font-semibold">Optimized UI</span>:
              We’re refining the cosmic experience—expect smoother transitions,
              faster load times, and a UI so sleek, it might just take off into
              orbit.
            </li>
          </ul>
          <p className="mt-6 text-[#F2F0E4]/70">
            Nebula is evolving. The galaxy is expanding—and we’re just getting
            started. 🌌
          </p>

          {/* Signature */}
          <div className="mt-8 text-right">
            <p className="text-[#F2F0E4]/60 italic text-sm">
              Designed & Developed with ☄️ by
            </p>
            <p className="font-['LogoFont'] text-transparent bg-clip-text animate-gradient text-lg font-semibold">
              Tushar Bhatt
            </p>
          </div>
        </div>
      </div>
      <div className="relative text-light z-10 px-6 pb-32">
        {/* Disclaimer */}
        <div className=" max-w-4xl mx-auto border border-[#F2F0E4]/30 backdrop-blur-[2px] rounded-3xl p-6 md:p-10">
          <div className="grain" />
          <p>
            Disclaimer: Nebula is a solo-built, experimental project crafted for
            learning and creative expression. It’s not intended to be a
            commercial brand or the next big platform.
          </p>
          <p className="mt-2">
            Think of it as a digital playground—made with curiosity, passion,
            and a love for design and development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatIsNebulaPage;
