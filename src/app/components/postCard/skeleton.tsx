import React from "react";

export default function Skeleton() {
  return (
    <div className="overflow-hidden relative border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[2px] p-3 light-text border rounded-3xl shadow-md">
      <div className="grain"></div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-8 h-8 animate-pulse  rounded-full light-bg opacity-25"></div>
        <div className="w-full">
          <div className="w-[40%] rounded-xl animate-pulse  light-bg p-2 opacity-25"></div>
        </div>
      </div>
      <div className="mb-4 w-full light-bg animate-pulse  p-5 rounded-xl opacity-25"></div>
    </div>
  );
}
