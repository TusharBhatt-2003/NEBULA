"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

export default function LogoutBtn() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      window.location.reload(); // Reload the page to reset the state
      router.push("/"); // After reload, navigate to home
      toast.success("Logged out successfully!");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Button onClick={logout} variant="outline" className="">
      Logout
    </Button>
  );
}
