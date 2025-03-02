"use client";
import React, { useEffect, useState, useRef } from "react";
import StarField from "./starField";
import PostCard from "./postCard/postCard";
import useUser from "../hooks/useUser";
import Skeleton from "./postCard/skeleton";
import UserProfile from "../profile/page";
import AddPost from "../add-post/page";

export default function Feed() {
  const { user } = useUser();
  const currentUserId = user?._id;
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
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
    <div className="relative">
      <div className="fixed">
        <StarField />
      </div>
      <div className="flex">
        <div className="hidden lg:block">
          <UserProfile />
        </div>
        <div className="lg:w-[50%] w-full lg:ml-[25vw] text-lg p-5 mb-24 flex flex-col-reverse justify-center items-center gap-5  overflow-hidden ">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, index) => <Skeleton key={index} />)
            : posts.length > 0
              ? posts.map((post) => (
                  <PostCard currentUserId={currentUserId} postId={post._id} />
                ))
              : !loading && <p className="text-[#fe3b01]">No users found.</p>}
        </div>
        <div className="hidden lg:block">
          <AddPost />
        </div>
      </div>
    </div>
  );
}
