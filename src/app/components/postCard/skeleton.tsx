import React from "react";

export default function Skeleton() {
  const randomIndex = Math.random() < 0.5 ? 1 : 2; // Randomly choose between the two divs

  return (
    <div className="overflow-hidden relative border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[2px] p-3 light-text border rounded-3xl">
      <div className="grain"></div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-8 h-8 animate-pulse rounded-full light-bg opacity-25"></div>
        <div className="w-full">
          <div className="w-[40%] rounded-3xl animate-pulse light-bg p-2 opacity-25"></div>
        </div>
      </div>
      {randomIndex === 1 ? (
        <div className="mb-4 w-full light-bg animate-pulse p-5 rounded-3xl opacity-25"></div>
      ) : (
        <div className="mb-4 w-full light-bg animate-pulse aspect-square rounded-3xl opacity-25"></div>
      )}
      <div className="flex justify-between">
        <div className="flex flex-wrap w-3/4 gap-2">
          <div className="light-bg z-[99] text-transparent animate-pulse opacity-25 font-bold  rounded-3xl w-fit">
            hhhh
          </div>
          <div className="light-bg z-[99] text-transparent animate-pulse opacity-25 font-bold  rounded-3xl w-fit">
            hhhh
          </div>
          <div className="light-bg z-[99] text-transparent animate-pulse opacity-25 font-bold  rounded-3xl w-fit">
            hhhh
          </div>
        </div>
      </div>
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
  );
}
