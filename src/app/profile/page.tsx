"use client";
import LogoutBtn from "@/app/components/logoutBtn";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function UserProfile({ params }: any) {
  const [data, setData] = useState("Nothing");

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Welcome
        <span className="font-mono text-[#fe3b01] mx-2 hover:underline">
          <Link href={`/profile/${data._id}`}>{data.username}</Link>
        </span>
      </p>
      <button
        onClick={getUserDetails}
        className="btnBgColor text-[#f3f7de] p-2 rounded-md"
      >
        Get User Detail
      </button>
      <LogoutBtn />
    </div>
  );
}
