"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Delete from "../../../public/delete";

export default function page() {
  const [users, setUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        if (response.ok) {
          setUsers(data); // Update state with fetched users
        } else {
          console.error(data.message || "Error fetching users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle deleting a user
  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch("/api/users/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId)); // Remove deleted user from state
        console.log("User deleted successfully");
      } else {
        console.error(data.error || "Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to open the confirmation modal
  const openModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  // Function to close the confirmation modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold m-4">All User:</h2>
      <div className="text-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 overflow-hidden">
        {users.length > 0 ? (
          users.map((user) => {
            // Set background, text, and border color based on user properties
            let backgroundColor = "transparent";
            let textColor = "";
            let borderColor = "black";

            if (user.isverified) {
              backgroundColor = "#C6CFBE";
              textColor = "#43685C";
              borderColor = "#43685C";
            }

            if (user.isAdmin) {
              backgroundColor = "#F6F0E4";
              textColor = "#DC842B";
              borderColor = "#DC842B";
            }

            return (
              <div
                key={user._id}
                className="border-2 border-black rounded-md flex justify-between items-center overflow-hidden"
                style={{
                  backgroundColor,
                  color: textColor,
                  borderColor,
                }}
              >
                <div className="flex">
                  <img src={user.profileUrl} className="w-20" />
                  <div className="px-2 flex flex-col justify-evenly h-full">
                    <p className="capitalize font-mono text-lg">
                      {user.username}
                    </p>
                    <p className="capitalize font-mono text-sm">{user.email}</p>
                    <p className="capitalize font-mono text-sm">
                      id: {user._id}
                    </p>

                    {/* Conditionally render a message for admin users */}
                    {user.isAdmin && (
                      <p className="text-sm mt-2 font-semibold">Admin</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start h-full">
                  <button onClick={() => openModal(user._id)} className="m-2">
                    <Delete />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-[#fe3b01]">No users found.</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-[#F3DDCF] text-[#C16270] p-5 rounded-md shadow-lg w-2/3 md:w-1/3">
            <h3 className="text-xl mb-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  if (selectedUserId) {
                    deleteUser(selectedUserId);
                    closeModal();
                  }
                }}
                className="bg-[#B71A45] text-[#F9C7C5] p-1 md:py-2 md:px-4 rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-[#F9ECE3] text-[#F9C7C5] p-1 md:py-2 md:px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
