import React from "react";

interface BioPropData {
  bio: string;
}

export default function Bio({ bio }: BioPropData) {
  return (
    <div className="backdrop-blur border border-[#F2F0E4]/30 overflow-hidden light-text py-5 px-3 rounded-3xl">
      <div className="grain"></div>
      <p>{bio}</p>
    </div>
  );
}
