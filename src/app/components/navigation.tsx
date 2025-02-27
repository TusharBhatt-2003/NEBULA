"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LogoutBtn from "./logoutBtn";

// Define the user type
interface User {
  _id: string;
  profileUrl?: string;
  isAdmin: boolean;
}

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null); // Properly typing user state
  const [loading, setLoading] = useState<boolean>(true); // Typing loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users/me");
        const data = await response.json();
        if (response.ok) {
          setUser(data.data); // Assume data.data is the user object
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
    return <div></div>; // Show loading state until the user is fetched
  }

  if (!user) {
    return null; // If there's no user, return null to hide the navigation
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center">
      {/* <div className="w-1/4 flex justify-center items-center">
        <LogoutBtn />
      </div> */}

      <Link href="/" className="w-1/4  cursor-pointer text-2xl font-bold">
        <svg
          fill="#000000"
          width="78px"
          height="78px"
          viewBox="0 0 256 256"
          id="Flat"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M232,56V92H136V48h88A8.00008,8.00008,0,0,1,232,56Zm-48,96h48V108H184Zm-96,0h80V108H88ZM72,108H24v44H72Zm64,100h88a8.00008,8.00008,0,0,0,8-8V168H136ZM120,48H32a8.00008,8.00008,0,0,0-8,8V92h96ZM24,200a8.00008,8.00008,0,0,0,8,8h88V168H24Z"></path>
        </svg>
      </Link>

      <Link
        href={`/profile/${user._id}`}
        className="w-1/4 flex justify-center items-center"
      >
        <div
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${user.profileUrl || "/default-profile.jpg"})`,
          }}
        ></div>
      </Link>

      {user.isAdmin && (
        <Link href="/admin-panel" className="text-2xl w-1/4 p-2 font-bold">
          Admin Panel
        </Link>
      )}
    </div>
  );
}
