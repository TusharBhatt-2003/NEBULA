import Loading from "@/app/components/loading";
import LogoutBtn from "@/app/components/logoutBtn";
import React from "react";

interface UserProfileProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = await params; // Await the params before using them

  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen py-2">
      <h1 className="text-4xl opacity-50 font-semibold">Profile Detail</h1>
      <hr />
      <p className="text-xl">
        This is your user ID: <br />
        {id ? (
          <span className=" p-1 font-mono text-[#fe3b01] rounded-md">{id}</span>
        ) : (
          <Loading />
        )}
      </p>
      <LogoutBtn />
    </div>
  );
}
