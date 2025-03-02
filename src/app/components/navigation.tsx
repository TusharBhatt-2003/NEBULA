"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Galaxy from "../../../public/galaxy";
import Admin from "../../../public/admin";
import Search from "../../../public/search";
import Notification from "../../../public/notification";
import AddPost from "../../../public/addPost";
import { usePathname } from "next/navigation";

// Define the user type
interface User {
  _id: string;
  profileUrl?: string;
  isAdmin: boolean;
}

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users/me");
        const data = await response.json();
        if (response.ok) {
          setUser(data.data);
        } else {
          console.error(data.message || "Error fetching users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="fixed z-[99] py-2 lg:hidden  bg-white/10 backdrop-blur-sm bottom-2 left-2 right-2 rounded-xl flex justify-between items-center overflow-hidden">
      <div className="grain"></div>
      <Link
        href="/feed"
        className={`w-1/4 flex justify-center rounded-xl p-2  items-center cursor-pointer font-bold ${
          pathname === "/feed" ? "animate-gradient-bg" : ""
        }`}
      >
        <Galaxy />
      </Link>

      <Link
        href="/search"
        className={`w-1/4 flex justify-center rounded-xl p-2 items-center cursor-pointer font-bold ${
          pathname === "/search" ? "animate-gradient-bg" : ""
        }`}
      >
        <Search />
      </Link>

      <Link
        href="/add-post"
        className={`w-1/4 flex justify-center rounded-xl p-2 items-center cursor-pointer font-bold ${
          pathname === "/add-post" ? "animate-gradient-bg" : ""
        }`}
      >
        <AddPost />
      </Link>

      <Link
        href="/notifications"
        className={`w-1/4 flex justify-center rounded-xl p-2 items-center cursor-pointer  font-bold ${
          pathname === "/notifications" ? "animate-gradient-bg" : ""
        }`}
      >
        <Notification />
      </Link>

      <Link
        href={`/profile`}
        className={`w-1/4 flex justify-center rounded-xl p-2 items-center ${
          pathname === `/profile}` ? "animate-gradient-bg" : ""
        }`}
      >
        <div
          className="w-12 h-12 bg-cover rounded-xl bg-center"
          style={{
            backgroundImage: `url(${user.profileUrl || "/default-profile.jpg"})`,
          }}
        ></div>
      </Link>

      {user.isAdmin && (
        <Link
          href="/admin-panel"
          className={`flex justify-center rounded-xl items-center cursor-pointer w-1/4 p-2 font-bold ${
            pathname === "/admin-panel" ? "animate-gradient-bg" : ""
          }`}
        >
          <Admin />
        </Link>
      )}
    </div>
  );
}
