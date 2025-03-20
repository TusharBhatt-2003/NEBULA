import React from "react";
import { Button } from "../ui/button";

export default function Skeleton() {
  return (
    <>
      <div className="flex animate-pulse gap-2">
        <div className="relative w-1/3 text-transparent bg-skeleton-bg bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer overflow-hidden light-text aspect-square h-full rounded-3xl object-cover">
          <div className="grain"></div>
        </div>

        <div className="relative w-2/3 py-2 px-3 flex flex-col gap-2 z-10 bg-skeleton-bg bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer backdrop-blur rounded-3xl border border-[#F2F0E4]/30 overflow-hidden light-text">
          <div className="grain"></div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-transparent bg-skeleton-bg bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer rounded-3xl">
              Full Name
            </h1>
            <p className="p-1 text-transparent rounded-xl border border-[#F2F0E4]/30 bg-skeleton-bg bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer">
              connection
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 backdrop-blur animate-pulse border border-[#F2F0E4]/30 overflow-hidden light-text py-5 px-3 rounded-3xl bg-skeleton-bg bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer">
        <div className="grain"></div>
        <p className="text-transparent">
          This is the bio of the user, They can write any thing here.
        </p>
      </div>

      <div className="mt-3 flex animate-pulse justify-between">
        <div className="flex justify-between items-center">
          <Button
            variant={"ghost"}
            className="text-transparent bg-skeleton-bg bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer"
          >
            Logout
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            className="text-transparent bg-skeleton-bg bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer"
          >
            Update Profile
          </Button>
        </div>
      </div>
    </>
  );
}
