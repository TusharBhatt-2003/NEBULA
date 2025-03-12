"use client";
import Link from "next/link";
import useUser from "./hooks/useUser";
import Feed from "./components/feed";
import { Button } from "./components/ui/button";
import NEBULA from "./components/NEBULA";
import { useState } from "react";
import Head from "next/head";

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
      <Head>
        <title>NEBULA | Ideas, Connections, Creativity</title>
        <meta
          name="description"
          content="Explore NEBULA, a cosmic space where ideas, connections, and creativity come together. Join our community to share and discover new thoughts and inspirations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="NEBULA, creativity, community, ideas, inspiration, cosmic space, connections"
        />
        <meta name="author" content="Your Name or Brand" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://nebula-three-dun.vercel.app/"
        />
        <meta
          property="og:title"
          content="NEBULA | Ideas, Connections, Creativity"
        />
        <meta
          property="og:description"
          content="Explore NEBULA, a cosmic space where ideas, connections, and creativity come together. Join our community to share and discover new thoughts and inspirations."
        />
        <meta
          property="og:image"
          content="https://i.pinimg.com/736x/f4/f6/a5/f4f6a522432e0b2ebe90964808c5610c.jpg"
        />

        {/* Twitter */}
        <meta
          property="twitter:card"
          content="https://i.pinimg.com/736x/f4/f6/a5/f4f6a522432e0b2ebe90964808c5610c.jpg"
        />
        <meta
          property="twitter:url"
          content="https://nebula-three-dun.vercel.app/"
        />
        <meta
          property="twitter:title"
          content="NEBULA | Ideas, Connections, Creativity"
        />
        <meta
          property="twitter:description"
          content="Explore NEBULA, a cosmic space where ideas, connections, and creativity come together. Join our community to share and discover new thoughts and inspirations."
        />
        <meta
          property="twitter:image"
          content="https://i.pinimg.com/736x/53/1c/ca/531cca19c089b7f17d7ad31ebfb664bd.jpg"
        />
      </Head>

      {!user ? (
        <div className="relative font-['spring'] gap-10 flex flex-col h-screen items-center justify-around overflow-hidden">
          <div className="absolute w-screen h-screen">
            <NEBULA />
          </div>

          <div className="relative z-10 backdrop-blur gap-5 py-5 px-10 rounded-xl border border-[#F2F0E4]/30 w-[90%] md:w-[40%] lg:w-[30%] text-center space-y-2 overflow-hidden">
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
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Signup</Button>
            </Link>
          </div>
        </div>
      ) : (
        <Feed />
        // todo: make a about NEBULA page
      )}
    </div>
  );
}
