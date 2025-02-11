"use client";
import Link from "next/link";
import React from "react";
import useUser from "../hooks/useUser";

export default function Navigation() {
  const { user, loading } = useUser();
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-evenly items-center border-t-2 border-black">
      <Link
        href={`/profile/${user?._id}`}
        className="text-2xl border-x-2 p-2 border-black font-bold"
      >
        Profile
      </Link>
      <Link href="/" className="text-2xl border-x-2 p-2 border-black font-bold">
        home
      </Link>
      {user?.isAdmin ? (
        <Link
          href="/admin-panel"
          className="text-2xl border-x-2 p-2 border-black font-bold"
        >
          admin panel
        </Link>
      ) : null}
    </div>
  );
}
