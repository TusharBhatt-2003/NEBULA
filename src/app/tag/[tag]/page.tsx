"use client";
import PostCard from "@/app/components/postCard/postCard";
import Skeleton from "@/app/components/postCard/skeleton";
import StarField from "@/app/components/starField";
import { Button } from "@/app/components/ui/button";
import useUser from "@/app/hooks/useUser";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Post {
  _id: string;
  createdAt: number;
  tags: string[];
  image: string;
  text: string;
  likes: { _id: string }[];
  userId: string;
  author: {
    username: string;
    profileUrl: string;
  };
}

export default function TagPage() {
  const { user, refreshUser } = useUser();
  const currentUserId = user?._id; // Get userId from useUser
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Ensure tag is a string
  const { tag: rawTag } = useParams();
  const tag = Array.isArray(rawTag) ? rawTag[0] : (rawTag ?? "");

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // Sync isFollowing state when user data updates
  useEffect(() => {
    if (user) {
      setIsFollowing(user.followingTags?.includes(tag) ?? false);
    }
  }, [user, tag]); // Re-run when user or tag changes

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data: Post[] = await response.json();
        if (response.ok) {
          const sortedPosts = data
            .sort((a, b) => b.createdAt - a.createdAt)
            .filter((post) => post.tags.includes(tag));

          setPosts(sortedPosts);
        } else {
          console.error("Error fetching posts.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [tag]);

  const handleFollowTag = async () => {
    if (!currentUserId) {
      console.error("User not authenticated.");
      return;
    }

    try {
      const response = await fetch("/api/users/follow-tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUserId, tag }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsFollowing((prev) => !prev);
        refreshUser();
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error following/unfollowing tag:", error);
    }
  };

  return (
    <div className="relative">
      <div className="fixed">
        <StarField />
      </div>
      <div className="flex gap-5 flex-col justify-center container mx-auto p-5">
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-['spring']  light-bg rounded-xl w-fit p-2">
                tag
              </h1>

              <Button
                onClick={handleFollowTag}
                variant={isFollowing ? "outline" : "default"}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </div>
            <p className="text-xl light-bg  font-semibold w-fit rounded-xl ">
              Posts
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-['spring'] text-light border rounded-3xl w-fit border-[#F2F0E4]/30 p-2 pb-3">
                {tag}
              </h1>

              <Button
                onClick={handleFollowTag}
                variant={isFollowing ? "outline" : "default"}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </div>
            <p className="text-xl font-semibold">{posts.length} Posts</p>
          </div>
        )}
        <div className="columns-2 space-y-2">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                likes={post.likes}
                key={post._id}
                image={post.image}
                text={post.text}
                tags={post.tags}
                currentUserId={currentUserId || ""}
                postId={post._id}
                authorId={post.userId}
                username={post.author?.username || "Unknown User"}
                profileUrl={post.author?.profileUrl || "/default-profile.png"}
              />
            ))
          ) : (
            <p className="text-[#fe3b01]">No posts found with this tag.</p>
          )}
        </div>
      </div>
    </div>
  );
}
