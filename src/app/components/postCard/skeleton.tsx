"use client";
import React from "react";
import { usePathname } from "next/navigation";

interface SkeletonProps {
  authorId?: string;
}

export default function Skeleton({ authorId = "" }: SkeletonProps) {
  const pathname = usePathname();
  const isProfilePage =
    pathname === "/profile" || pathname === `/profile/${authorId}`;

  const randomIndex = Math.random() < 0.5 ? 1 : 2;
  const divCount = Math.floor(Math.random() * 5) + 1;

  const widthClasses = ["w-1/6", "w-1/4", "w-1/3", "w-2/5", "w-1/2"];

  const divs = Array.from({ length: divCount }, (_, index) => {
    const randomWidth =
      widthClasses[Math.floor(Math.random() * widthClasses.length)];

    return (
      <div
        key={index}
        className={`light-bg z-[99] text-transparent animate-pulse opacity-25 font-bold rounded-3xl ${randomWidth}`}
      >
        hhhh
      </div>
    );
  });

  return (
    <div className="overflow-hidden relative border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[2px] p-3 light-text border rounded-3xl">
      <div className="grain"></div>

      {/* Conditionally render userProfile */}
      {!isProfilePage && (
        <div id="userProfile" className="flex items-center space-x-4 mb-4">
          <div className="w-8 h-8 aspect-square animate-pulse rounded-full light-bg opacity-25"></div>
          <div className="w-full">
            <div className="w-[40%] rounded-3xl animate-pulse light-bg p-2 opacity-25"></div>
          </div>
        </div>
      )}

      {randomIndex === 1 ? (
        <div className="w-full light-bg animate-pulse p-5 rounded-3xl opacity-25"></div>
      ) : (
        <div className="w-full light-bg animate-pulse aspect-square rounded-3xl opacity-25"></div>
      )}

      {/* Conditionally render tag&likes */}
      {!isProfilePage && (
        <div id="tag&likes" className="flex mt-4 justify-between items-end">
          <div className="flex flex-wrap w-3/4 gap-2">{divs}</div>
          <div className="flex animate-pulse h-fit opacity-25 bg-black rounded-3xl px-4 py-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={"gray"}
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18.35l-1.45-1.32C5.4 13.92 2 11.28 2 8.5 2 6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C11.46 5.99 12.96 5 14.5 5c2 0 3.5 1.5 3.5 3.5 0 2.78-3.4 5.42-6.55 8.54L10 18.35z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
