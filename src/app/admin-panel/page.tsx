"use client";
import React, { useEffect, useState } from "react";
import LogoutBtn from "../components/logoutBtn";
import ConfirmationModal from "../components/confirmationModal";
import UsersCardForAdminPanel from "../components/usersCardForAdminPanel";

const SkeletonUserCard = () => {
  return (
    <div className="border-2 border-black rounded-xl flex justify-between items-center ">
      <div className="w-20 bg-slate-50 h-20 m-2 rounded-md animate-pulse"></div>
      <div className="w-1/2 rounded-full h-5 bg-slate-50 animate-pulse"></div>
    </div>
  );
};

export default function Page() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

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

  // Function to delete a user
  const deleteUser = async () => {
    if (!selectedUserId) return;
    try {
      const response = await fetch("/api/users/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUserId }),
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(users.filter((user) => user._id !== selectedUserId));
        console.log("User deleted successfully");
      } else {
        console.error(data.error || "Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    closeModal();
  };

  // Open modal with user ID
  const openModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b-2 border-black">
        <h2 className="text-2xl border-r-2 p-2 border-black font-bold">
          All Users:
        </h2>
        <div className="border-l-2 p-2 border-black">
          <LogoutBtn />
        </div>
      </div>

      <div className="text-lg grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 my-5 mx-2 overflow-hidden">
        {loading
          ? Array(15)
              .fill(0)
              .map((_, index) => <SkeletonUserCard key={index} />)
          : users.length > 0
            ? users.map((user) => (
                <UsersCardForAdminPanel
                  key={user._id}
                  user={user}
                  onDelete={openModal}
                />
              ))
            : !loading && <p className="text-[#fe3b01]">No users found.</p>}
      </div>

      {/* Reusable Confirmation Modal */}
      {isModalOpen && (
        <ConfirmationModal
          sentence="Are you sure you want to delete this user?"
          onConfirm={deleteUser}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}
