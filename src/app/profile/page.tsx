"use client";

import LogoutBtn from "@/app/components/logoutBtn";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "../components/loading";

interface User {
  _id: string;
  username: string;
}

export default function UserProfile() {
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
      <div className="text-4xl flex gap-2">
        <h1>Welcome</h1>
        {user ? (
          <Link
            className="font-mono text-[#fe3b01] hover:underline"
            href={`/profile/${user._id}`}
          >
            {user.username}
          </Link>
        ) : (
          <Loading />
        )}
      </div>
      <hr />
      <LogoutBtn />
    </div>
  );
}
