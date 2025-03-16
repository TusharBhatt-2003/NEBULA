"use client";
import React, { useEffect, useState } from "react";
import ConfirmationModal from "../components/confirmationModal";
import UsersCardForAdminPanel from "../components/usersCardForAdminPanel";
import Loading from "../components/loading";

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
  const [userPostCounts, setUserPostCounts] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/posts"),
        ]);

        const usersData = await usersRes.json();
        const postsData = await postsRes.json();

        if (usersRes.ok && postsRes.ok) {
          setUsers(usersData);

          // Count posts per user
          const postCounts: Record<string, number> = {};
          postsData.forEach((post: any) => {
            const userId = post.userId; // adjust if your post object structure is different
            postCounts[userId] = (postCounts[userId] || 0) + 1;
          });

          setUserPostCounts(postCounts);
        } else {
          console.error("Error fetching users or posts.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndPosts();
  }, []);

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
        setUsers((prev) => prev.filter((user) => user._id !== selectedUserId));
        const updatedPostCounts = { ...userPostCounts };
        delete updatedPostCounts[selectedUserId];
        setUserPostCounts(updatedPostCounts);
      } else {
        console.error(data.error || "Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    closeModal();
  };

  const openModal = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="relative overflow-hidden pb-24 px-4">
      <div className="flex z-10 light-text justify-between items-center">
        <h2 className="text-2xl p-2 font-bold">All Users:</h2>
      </div>

      <div className="text-lg space-y-2 my-5 overflow-hidden">
        {loading ? (
          <Loading />
        ) : users.length > 0 ? (
          users.map((user) => (
            <UsersCardForAdminPanel
              key={user._id}
              user={user}
              postCount={userPostCounts[user._id] || 0}
              onDelete={openModal}
            />
          ))
        ) : (
          !loading && <p className="text-[#fe3b01]">No users found.</p>
        )}
      </div>

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
