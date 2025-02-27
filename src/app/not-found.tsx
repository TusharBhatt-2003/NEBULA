import React from "react";
import StarField from "./components/starField";

export default function NotFound() {
  return (
    <div className="bg-black  w-screen h-screen flex justify-center flex-col gap-5 items-center relative overflow-hidden">
      <StarField />
      <div className="relative z-10  backdrop-blur gap-5 py-10 rounded-xl border border-[#F2F0E4]/30 w-[90%] md:w-[40%] lg:w-[30%] text-center space-y-2 overflow-hidden light-text">
        <div className="grain"></div>
        <h1 className="m-1 font-['big'] font-semibold text-7xl text-transparent bg-clip-text animate-gradient-para">
          404
        </h1>
        <p>
          The page you are looking for does not exist, <br /> or <br /> is under
          develepment.
        </p>
      </div>
    </div>
  );
}
