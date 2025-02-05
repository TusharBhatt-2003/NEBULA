import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className=" p-1 font-mono btnBgColor rounded-md mx-2">
          {params.id}
        </span>
      </p>
    </div>
  );
}
