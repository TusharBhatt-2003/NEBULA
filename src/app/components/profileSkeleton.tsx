import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="shadow-xl border-2 border-black">
      <div className="w-64 h-64  m-3 border-2 border-black bg-neutral-300 animate-pulse"></div>
      <div className="m-3 space-y-2">
        <div className="h-6 bg-[#B01018] opacity-70 w-3/4 animate-pulse"></div>
        <div className="h-4 bg-neutral-300  w-1/2 animate-pulse"></div>
      </div>
      <div className="flex items-center gap-3 m-3">
        <div className="h-5 bg-neutral-300 w-24 animate-pulse"></div>
        <div className="h-5 bg-neutral-300 w-24 animate-pulse"></div>
      </div>
    </div>
  );
}
