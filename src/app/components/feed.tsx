"use client";
import React, { useEffect, useState, useMemo } from "react";
import StarField from "./starField";
import PostCard from "./postCard/postCard";
import useUser from "../hooks/useUser";
import Skeleton from "./postCard/skeleton";
import UserProfile from "../profile/page";
import AddPost from "../add-post/page";
import SearchPage from "../search/page";
import PopupAlert from "./PopupAlert";
import Link from "next/link";

interface Post {
  _id: string;
  createdAt: number;
  tags: string[];
}

export default function Feed() {
  const { user } = useUser();
  const { _id: currentUserId, followingTags = [] } = user || {};

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const showPopup = useMemo(() => followingTags.length === 0, [followingTags]);

  useEffect(() => {
    if (!followingTags.length) {
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data: Post[] = await response.json();
        setPosts(
          data
            .filter((post) =>
              post.tags.some((tag) => followingTags.includes(tag)),
            )
            .sort((a, b) => b.createdAt - a.createdAt),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} />
              ))
            : posts.map((post) => (
                <PostCard
                  key={post._id}
                  currentUserId={currentUserId || ""}
                  postId={post._id}
                />
              ))}

          {showPopup && (
            <div className="flex h-screen justify-center items-center gap-5">
              <Link
                href="/search"
                className="border-2 border-[#F2F0E4]/30 p-10 backdrop-blur-[1px] rounded-xl"
              >
                <div className="p-2 light-bg text-black rounded-xl">
                  Follow Tags
                </div>
              </Link>
            </div>
          )}

          {showPopup && (
            <PopupAlert alertMessage="You haven't followed any tags yet! Follow some to see relevant posts." />
          )}
        </div>

        <div className="hidden lg:block lg:w-[30%]">
          <AddPost />
          <SearchPage />
        </div>
      </div>
    </div>
  );
}
