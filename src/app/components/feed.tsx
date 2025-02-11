"use client";
import React, { useEffect, useState } from "react";
import LogoutBtn from "../components/logoutBtn";
import UsersCard from "./userCard";

const SkeletonUserCard = () => {
  return (
    <div className="border-2 border-black  flex justify-between items-center ">
      <div className="w-20 bg-neutral-300 h-20 m-2 animate-pulse"></div>
      <div className="w-1/2 h-5 bg-neutral-300 animate-pulse"></div>
    </div>
  );
};

export default function Feed() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
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

  return (
    <div>
      <div className="text-lg grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 my-5 mx-2 overflow-hidden">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => <SkeletonUserCard key={index} />)
          : users.length > 0
            ? users.map((user) => <UsersCard key={user._id} user={user} />)
            : !loading && <p className="text-[#fe3b01]">No users found.</p>}
      </div>
    </div>
  );
}
