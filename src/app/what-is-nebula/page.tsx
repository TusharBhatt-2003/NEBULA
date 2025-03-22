"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarField from "../components/starField";
import { Button } from "../components/ui/button";
import LightSpeedAnimation from "../components/lightSpeedAnimation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

gsap.registerPlugin(ScrollTrigger);

const WhatIsNebulaPage = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const manifestoRef = useRef<HTMLDivElement | null>(null);
  const disclaimerRef = useRef<HTMLDivElement | null>(null);

  const features = [
    {
      title: "Post Freely",
      description: "Share images, GIFs, and text. Your creativity, your way.",
      lottieUrl:
        "https://lottie.host/dd5dc1db-60f0-4cfd-95e3-24c96ab2b484/5ev3LPOUkW.lottie",
    },
    {
      title: "Follow Tags",
      description:
        "Stay focused on content, not people. Follow what inspires you.",
      lottieUrl:
        "https://lottie.host/1e7875d8-c278-40f2-b210-2217f8b1153e/v6UgKFyLls.lottie",
    },
    {
      title: "Cosmic UI",
      description: "Clean, space-themed design with a focus on your content.",
      lottieUrl:
        "https://lottie.host/2da51f6f-9ff1-465a-8bfa-53f37a1f3069/WUVQNCWobg.lottie",
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
            delay: i * 0.5,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            ease: "bounce",
          },
        );
      });
    }

    if (manifestoRef.current) {
      gsap.fromTo(
        manifestoRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          delay: 0.5,
          duration: 1,
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          ease: "bounce",
        },
      );
    }

    if (disclaimerRef.current) {
      gsap.fromTo(
        disclaimerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: disclaimerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          ease: "bounce",
        },
      );
    }
  }, []);

  return (
    <div className="relative min-h-screen text-light overflow-hidden">
      <div className="fixed">
        <StarField />
      </div>
      <LightSpeedAnimation />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 1, y: -10, scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24"
      >
        <motion.h1
          initial={{ opacity: 1, y: -10, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="text-4xl font-['spring'] md:text-6xl font-bold "
        >
          What is{" "}
          <span className="font-['LogoFont'] text-transparent bg-clip-text animate-gradient">
            NEBULA
          </span>{" "}
          ?
        </motion.h1>

        <motion.p
          initial={{ opacity: 1, y: -10, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 3, delay: 1 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-[#F2F0E4]/70"
        >
          In a universe full of noise,{" "}
          <span className="text-[#F2F0E4] font-semibold ">Nebula</span> is your
          space to shine. A social platform for creators, thinkers, and
          dreamers—where you can share artwork, photography, quotes, and
          thoughts in images, GIFs, or text.
        </motion.p>

        <motion.div
          initial={{ opacity: 1, y: -10, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 3, delay: 1 }}
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

          <p className="mt-4 text-[#F2F0E4] max-w-4xl mx-auto border-[#F2F0E4]/30 backdrop-blur-[2px] border rounded-3xl p-2">
            <div className="grain" />
            ⚠️ Strongly recommend viewing on mobile – NEBULA’s UI is optimized
            only for mobile screens right now. Trust me, it looks way better
            there!{" "}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 0, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 3, delay: 1 }}
          className="mt-10"
        >
          <a href="/search">
            <Button className="px-6 font-['spring'] py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition mb-10">
              Explore Nebula
            </Button>
          </a>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div className="relative z-10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="overflow-hidden text-light relative p-5 border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[2px] light-text border rounded-3xl flex justify-between items-center"
            >
              <div className="grain" />
              <div className="w-2/3">
                <h3 className="text-xl font-['spring'] font-semibold mb-2 mt-4">
                  {feature.title}
                </h3>
                <p className="">{feature.description}</p>
              </div>
              <DotLottieReact
                src={feature.lottieUrl}
                loop
                className="w-1/3"
                autoplay
                style={{ width: "120px", height: "120px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Manifesto Section with Scroll Animation */}
      <div className="relative z-10 p-6" ref={manifestoRef}>
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

      {/* Disclaimer Section with Scroll Animation */}
      <div className="relative text-light z-10 px-6 pb-32" ref={disclaimerRef}>
        <div className="max-w-4xl mx-auto border border-[#F2F0E4]/30 backdrop-blur-[2px] rounded-3xl p-6 md:p-10">
          <div className="grain" />
          <p className="font-['spring'] pb-2 text-xl">Disclaimer :</p>
          <p>
            Nebula is a solo-built, experimental project crafted for learning
            and creative expression. It’s not intended to be a commercial brand
            or the next big platform.
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
