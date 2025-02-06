"use client";

import LogoutBtn from "@/app/components/logoutBtn";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
}

export default function UserProfile({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get<{ data: User }>("/api/users/me");
        setUser(res.data.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Welcome
        <span className="font-mono text-[#fe3b01] mx-2 hover:underline">
          {user ? (
            <Link href={`/profile/${user._id}`}>{user.username}</Link>
          ) : (
            "Loading..."
          )}
        </span>
      </p>
      <LogoutBtn />
    </div>
  );
}
