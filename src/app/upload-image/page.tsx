import React from "react";
import ProfilePictureUpdate from "../components/imagekit/profilePictureUpdate";

export default function page() {
  return (
    <div className="flex flex-col gap-5 items-center pt-24">
      <h1 className="text-3xl font-bold mb-1">Wildlife Video</h1>
      <p>Upload your wildlife video here!</p>
      {/* <input type='file' accept='video/*' /> */}
      {/* <ProfilePictureUpdate /> */}
    </div>
  );
}
