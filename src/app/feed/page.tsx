import React from "react";
import Feed from "../components/feed";

export default function page() {
  return (
    <div className="relative overflow-hidden">
      <h1 className="overflow-hidden m-5 mb-0 flex flex-col justify-center relative border-[#F2F0E4]/30 z-10 backdrop-blur-[2px] p-3 light-text font-semibold border rounded-3xl text-center font-['spring'] text-light text-lg">
        <div className="grain"></div>
        The posts from the tags you follow will appear here.
      </h1>

      <Feed />
    </div>
  );
}
