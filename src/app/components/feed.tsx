"use client";
import React, { useEffect, useState } from "react";
import StarField from "./starField";
import PostCard from "./postCard/postCard";
import useUser from "../hooks/useUser";
import UserProfile from "../profile/page";
import AddPost from "../add-post/page";
import SearchPage from "../search/page";
import PopupAlert from "./PopupAlert";
import Link from "next/link";
import Loading from "./loading";
import Skeleton from "./postCard/skeleton";

interface Post {
  _id: string;
  createdAt: number;
  tags: string[];
  image: string;
  text: string;
  userId: string;
  author: {
    username: string;
    profileUrl: string;
  };
  likes: { _id: string }[];
}

export default function Feed() {
  const { user } = useUser();
  const { _id: currentUserId, followingTags = [] } = user || {};

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  // Show popup alert only after 5 seconds delay if no tags are followed
  useEffect(() => {
    if (followingTags.length === 0) {
      const timeout = setTimeout(() => {
        setShowPopup(true);
      }, 10000);

      return () => clearTimeout(timeout); // Cleanup the timeout on unmount or dependency change
    }
  }, [followingTags]); // Dependency on followingTags to trigger when it's empty

  // Fetch posts when followingTags is not empty
  useEffect(() => {
    if (!posts) {
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `/api/posts/followed-tag-posts?tags=${followingTags.join(",")}`,
        );
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data: Post[] = await response.json();
        setPosts(data);
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
                <div className="w-full" key={post._id}>
                  <PostCard
                    image={post.image}
                    text={post.text}
                    tags={post.tags}
                    currentUserId={currentUserId || ""}
                    postId={post._id}
                    authorId={post.userId}
                    username={post.author.username}
                    profileUrl={post.author.profileUrl}
                    likes={post.likes}
                  />
                </div>
              ))}

          {showPopup && (
            <>
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
              <PopupAlert alertMessage="You haven't followed any tags yet! Follow some to see relevant posts." />
            </>
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
