"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import ConfirmationModal from "./confirmationModal";

export default function LogoutBtn() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

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
    <>
      <Button
        onClick={() => setModalOpen(true)}
        variant="outline"
        className="z-[99]"
      >
        Logout
      </Button>

      {modalOpen && (
        <ConfirmationModal
          sentence="Are you sure you want to logout?"
          onConfirm={() => {
            logout();
            setModalOpen(false);
          }}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
