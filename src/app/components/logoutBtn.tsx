"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function LogoutBtn() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully!");
      router.push("/login"); // Redirect to the login page
      window.location.reload(); // Reload the page to reset the state
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <button onClick={logout} className="btnBgColor text-[#f3f7de] px-2 py-1">
      Logout
    </button>
  );
}
