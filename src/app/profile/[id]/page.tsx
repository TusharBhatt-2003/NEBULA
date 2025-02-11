"use client";
import Loading from "@/app/components/loading";
import LogoutBtn from "@/app/components/logoutBtn";
import ProfileSkeleton from "@/app/components/profileSkeleton";
import useUser from "@/app/hooks/useUser";
import React from "react";

export default function UserProfile() {
  const { user, loading } = useUser();

  return (
    <div className="h-screen flex justify-center items-center p-2">
      {loading ? (
        <ProfileSkeleton />
      ) : user ? (
        <div className="shadow-xl rounded-2xl border-2 border-black">
          <img
            src={user.profileUrl}
            className="w-64 rounded-lg m-3 border-2 border-black"
          />
          <div className="m-3">
            <p className="uppercase text-[#B01018] text-xl font-black">
              {user.username}
            </p>
            <p>{user.email}</p>
          </div>
          <div className="flex items-center gap-3 m-3">
            {user.isverified ? (
              <div className=" py-1 px-2 text-[#f3f7de] rounded bg-emerald-600">
                <p>Verified</p>
              </div>
            ) : (
              <div className=" py-1 px-2 rounded bg-green-100">
                <p>Not Verified</p>
              </div>
            )}
            <p>
              {user.isAdmin ? (
                <div className=" py-1 px-2 rounded text-yellow-600 bg-yellow-100">
                  <p>Admin</p>
                </div>
              ) : null}
            </p>
          </div>
          <div className="my-4 w-full flex justify-center items-center">
            <LogoutBtn />
          </div>
        </div>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
}
