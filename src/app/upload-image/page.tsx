import React from "react";
import ImagekitUploud from "../components/imagekit/profilePictureUpdate";

export default function page() {
  return (
    <div className="flex flex-col gap-5 items-center pt-24">
      <h1 className="text-3xl font-bold mb-1">Wildlife Video</h1>
      <p>Upload your wildlife video here!</p>
      {/* <input type='file' accept='video/*' /> */}
      <ImagekitUploud />

      <img src="https://ik.imagekit.io/i8ts8emc3/hype____LfwTaCKLvG.png?tr=w-600" />
    </div>
  );
}
