"use client";
import React, { useEffect, useState } from "react";
import LogoutBtn from "../components/logoutBtn";
import UsersCard from "./userCard";
import StarField from "./starField";

const SkeletonUserCard = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden backdrop-blur-[5px] flex justify-between w-full h-full">
      <div className="grain"></div>
      <div className="w-20 relative overflow-hidden backdrop-blur-lg rounded-3xl border border-[#f2f0e4] h-20 m-2 animate-pulse">
        {" "}
        <div className="grain"></div>
      </div>
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
      <div className="text-lg grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 my-5 mx-2 overflow-hidden mb-24">
        <StarField />
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
