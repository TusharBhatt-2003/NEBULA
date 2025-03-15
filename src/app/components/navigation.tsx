"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Galaxy from "../../../public/galaxy";
import Admin from "../../../public/admin";
import Search from "../../../public/search";
import Notification from "../../../public/notification";
import AddPost from "../../../public/addPost";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed z-[99] p-2 py-2 lg:hidden bg-white/10 backdrop-blur-sm bottom-2 left-2 right-2 rounded-xl flex justify-between items-center overflow-hidden"
    >
      <div className="grain"></div>

      {[
        { href: "/feed", icon: <Galaxy /> },
        { href: "/search", icon: <Search /> },
        { href: "/add-post", icon: <AddPost /> },
        { href: "/notifications", icon: <Notification /> },
      ].map(({ href, icon }) => (
        <motion.div
          key={href}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-1/4 flex justify-center rounded-xl p-2 items-center cursor-pointer"
        >
          <Link
            href={href}
            className={`font-bold ${
              pathname === href ? "animate-gradient-bg scale-110" : ""
            }`}
          >
            {icon}
          </Link>
        </motion.div>
      ))}

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-1/4 flex justify-center rounded-xl p-2 items-center"
      >
        <Link href={`/profile`}>
          <div
            className="w-12 h-12 bg-cover rounded-xl bg-center"
            style={{
              backgroundImage: `url(${user.profileUrl || "/default-profile.jpg"})`,
            }}
          ></div>
        </Link>
      </motion.div>

      {user.isAdmin && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-1/4 flex justify-center rounded-xl p-2 items-center cursor-pointer"
        >
          <Link
            href="/admin-panel"
            className={`font-bold ${
              pathname === "/admin-panel" ? "animate-gradient-bg scale-110" : ""
            }`}
          >
            <Admin />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
