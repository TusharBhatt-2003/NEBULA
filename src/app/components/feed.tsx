"use client";

import React, { useEffect, useState } from "react";
import StarField from "./starField";
import PostCard from "./postCard/postCard";
import useUser from "../hooks/useUser";
import Skeleton from "./postCard/skeleton";
import UserProfile from "../profile/page";
import AddPost from "../add-post/page";
import SearchPage from "../search/page";

interface Post {
  _id: string;
  createdAt: number;
  tags: string[];
}

export default function Feed() {
  const { user } = useUser();
  const currentUserId = user?._id;
  const followingTags = user?.followingTags || [];

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data: Post[] = await response.json();
        if (response.ok) {
          const filteredPosts = data
            .filter((post) =>
              post.tags.some((tag) => followingTags.includes(tag)),
            )
            .sort((a, b) => b.createdAt - a.createdAt);

          setPosts(filteredPosts);
        } else {
          console.error("Error fetching posts.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (followingTags.length > 0) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [followingTags]);

  return (
    <div className="relative">
      <div className="fixed">
        <StarField />
      </div>
      <div className="flex justify-center relative container mx-auto">
        <div className="hidden lg:block">
          <UserProfile />
        </div>
        <div className="lg:w-[55%] w-full lg:ml-[20vw] text-lg p-5 mb-24 flex flex-col justify-center items-center gap-5 overflow-hidden">
          {!loading
            ? posts.map((post) => (
                <PostCard
                  key={post._id}
                  currentUserId={currentUserId ?? ""}
                  postId={post._id}
                />
              ))
            : Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} />
              ))}
        </div>
        <div className="hidden lg:block lg:w-[30%] ">
          <AddPost />
          <SearchPage />
        </div>
      </div>
    </div>
  );
}
