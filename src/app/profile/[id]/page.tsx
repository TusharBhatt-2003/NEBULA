"use client";
import Loading from "@/app/components/loading";
import LogoutBtn from "@/app/components/logoutBtn";
import useUser from "@/app/hooks/useUser";
import React from "react";

export default function UserProfile() {
  const { user, loading } = useUser();

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-screen py-2">
      <div className="w-40 bg-contain">
        <img src={user?.profileUrl} className="" />
      </div>
      <h1 className="text-4xl text-[#fe3b01] font-semibold">
        {user?.username}
      </h1>
      <hr />
      <div className="text-xl">
        {loading ? (
          <Loading />
        ) : (
          <div className="border-2 border-black rounded-xl p-2">
            <p>
              user ID:{" "}
              <span className="p-1 font-mono text-[#fe3b01] rounded-md">
                {user?._id}
              </span>
            </p>
            <p>email: {user?.email}</p>
            <p></p>
            <p className="text-center mt-2 rounded bg-[#8DBF8A] text-[#F3F6D7]">
              {user?.isAdmin ? "You are admin." : "You are a regular user."}
            </p>
          </div>
        )}
      </div>
      <LogoutBtn />
    </div>
  );
}
