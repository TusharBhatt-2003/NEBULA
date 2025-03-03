import React from "react";
import { Button } from "../ui/button";
export default function Skeleton() {
  return (
    <>
      <div className="flex gap-2">
        <div className="relative w-1/3 animate-pulse text-transparent">
          <div className="backdrop-blur border border-[#F2F0E4]/30 overflow-hidden light-text aspect-square h-full rounded-xl object-cover" />{" "}
          <div className="grain"></div>
        </div>

        <div className="relative animate-pulse w-2/3 py-2 px-3 flex flex-col gap-2 z-10 backdrop-blur rounded-xl border border-[#F2F0E4]/30 overflow-hidden light-text">
          <div className="grain"></div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-transparent light-bg opacity-25 rounded-3xl animate-pulse">
              Full Name
            </h1>
            <p className="p-1 text-transparent rounded-xl border border-[#F2F0E4]/30">
              connection
            </p>
          </div>
          <p className="light-bg opacity-25 rounded-3xl animate-pulse text-transparent">
            This is the bio of the user, They can write any thing here.
          </p>
        </div>
      </div>
      <div className="flex  justify-between">
        <div className="flex animate-pulse justify-between items-center">
          <Button variant={"outline"} className="text-transparent">
            Logout
          </Button>
        </div>
        <div className="flex animate-pulse justify-between items-center">
          <Button className="text-transparent">Update Profile</Button>
        </div>
      </div>
    </>
  );
}
