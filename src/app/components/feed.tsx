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
import Skeleton from "./postCard/skeleton";
import { Button } from "./ui/button";

interface Post {
  _id: string;
  createdAt: number;
  tags: string[];
  image: string;
  text: string;
  userId: string;
  comments: string[];
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
    if (!followingTags.length) {
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

  // console.log(user);
  // console.log(posts);

  return (
    <div className="relative p-5 mb-24">
      <div className="fixed">
        <StarField />
      </div>

      <div className="lg:columns-4 mb-5 relative">
        {/* <div className="hidden lg:block">
          <UserProfile />
        </div> */}

        <div className="w-full text-lg flex  lg:space-y-5 flex-col gap-5 lg:gap-0 justify-center items-center">
          {loading && !posts
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} />
              ))
            : posts.map((post) => (
                <PostCard
                  key={post._id}
                  image={post.image}
                  text={post.text}
                  tags={post.tags}
                  currentUserId={currentUserId || ""}
                  postId={post._id}
                  authorId={post.userId}
                  username={post.author.username}
                  profileUrl={post.author.profileUrl}
                  likes={post.likes}
                  comments={post.comments}
                />
              ))}
        </div>
      </div>
      {/* <div className="hidden lg:block lg:w-[30%]">
          <AddPost />
          <SearchPage />
        </div> */}
      {followingTags && (
        <div className="flex flex-col border-2 border-[#F2F0E4]/30 p-10 backdrop-blur-[1px] rounded-3xl justify-center items-center gap-5">
          <p className="text-lg text-center font-medium text-[#F2F0E4]">
            To see posts in your feed, follow the tags you're interested in!
          </p>
          <Link href="/search">
            <Button>Follow Tags</Button>
          </Link>
        </div>
      )}
      {showPopup && (
        <>
          <PopupAlert alertMessage="You haven't followed any tags yet! Follow some to see relevant posts." />
        </>
      )}
    </div>
  );
}
