import LogoutBtn from "@/app/components/logoutBtn";
import React from "react";

interface UserProfileProps {
  params: { id: string };
}

export default function UserProfile({ params }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        This your user ID:
        <span className=" p-1 font-mono text-[#f3f7de] btnBgColor rounded-md mx-2">
          {params.id}
        </span>
      </p>
      <LogoutBtn />
    </div>
  );
}
