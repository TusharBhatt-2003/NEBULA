import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="shadow-xl rounded-2xl border-2 border-black">
      <div className="w-64 h-64 rounded-lg m-3 border-2 border-black bg-gray-300 animate-pulse"></div>
      <div className="m-3 space-y-2">
        <div className="h-6 bg-[#B01018] opacity-70 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
      </div>
      <div className="flex items-center gap-3 m-3">
        <div className="h-5 bg-gray-300 rounded w-24 animate-pulse"></div>
        <div className="h-5 bg-gray-300 rounded w-24 animate-pulse"></div>
      </div>
    </div>
  );
}
