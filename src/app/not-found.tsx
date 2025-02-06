import React from "react";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center flex-col gap-5 items-center">
      <h1 className="btnBgColor w-fit rounded-md p-1 font-semibold text-7xl text-[#f3f7de]">
        404
      </h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
