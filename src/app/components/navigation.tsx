"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { FiHome, FiSearch, FiPlus } from "react-icons/fi"; // ⬅️ React icons
import Admin from "../../../public/admin";

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

  if (loading) return <div></div>;
  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="overflow-hidden mb-0 border-[#F2F0E4]/30 z-10 backdrop-blur-[10px] p-3 light-text border rounded-3xl fixed py-2 lg:hidden bg-white/5 bottom-2 left-2 right-2 flex justify-between items-center"
    >
      <div className="grain"></div>

      {[
        { href: "/feed", icon: <FiHome size={40} /> },
        { href: "/search", icon: <FiSearch size={40} /> },
        { href: "/add-post", icon: <FiPlus size={40} /> },
      ].map(({ href, icon }) => (
        <motion.div
          key={href}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.7 }}
          transition={{
            duration: 0.5,
            ease: "easeIn",
            type: "spring",
            damping: 5,
          }}
          className="w-1/4 flex justify-center rounded-xl p-2 items-center cursor-pointer"
        >
          <Link
            href={href}
            className={`p-2 transition-all ease-in-out duration-100 ${
              pathname === href
                ? "animate-gradient-bg scale-125"
                : "light-bg text-black rounded-[1rem]"
            }`}
          >
            {icon}
          </Link>
        </motion.div>
      ))}

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.7 }}
        transition={{
          duration: 0.3,
          ease: "easeIn",
          type: "spring",
          damping: 5,
        }}
        className="w-1/4 flex justify-center rounded-xl p-2 items-center cursor-pointer"
      >
        <Link
          href="/profile"
          className={`transition-all duration-100 ease-in-out ${
            pathname === "/profile"
              ? "animate-gradient-bg scale-125 p-[2px] rounded-xl"
              : ""
          }`}
        >
          <div
            className="w-14 h-14 bg-cover rounded-xl bg-center"
            style={{
              backgroundImage: `url(${user.profileUrl || "/default-profile.jpg"})`,
            }}
          ></div>
        </Link>
      </motion.div>

      {user.isAdmin && (
        <motion.div
          transition={{
            duration: 0.3,
            ease: "easeIn",
            type: "spring",
            damping: 5,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.7 }}
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
