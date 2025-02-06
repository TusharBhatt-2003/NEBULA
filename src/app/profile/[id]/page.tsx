import LogoutBtn from "@/app/components/logoutBtn";
import React from "react";

interface UserProfileProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = await params; // Await the params before using them

  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        This is your user ID:
        <span className=" p-1 font-mono text-[#f3f7de] btnBgColor rounded-md mx-2">
          {id}
        </span>
      </p>
      <LogoutBtn />
    </div>
  );
}
