import React, { useEffect, useState } from "react";
import Skeleton from "./skeleton";
import Link from "next/link";

interface Post {
  _id: string;
  userId: string;
  text: string;
  likes: string[]; // Array of user IDs who liked the post
  comments: string[]; // Array of comment IDs
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Author {
  _id: string;
  username: string;
  profileUrl: string;
}

interface PostCardProps {
  postId: string;
  currentUserId: string;
}

export default function PostCard({ postId, currentUserId }: PostCardProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedIsLiked = localStorage.getItem(
        `isLiked_${postId}_${currentUserId}`,
      );
      return savedIsLiked ? JSON.parse(savedIsLiked) : false;
    }
    return false;
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data: Post[] = await response.json();
        const foundPost = data.find((p) => p._id === postId);
        if (foundPost) {
          setPost(foundPost);
          setIsLiked(foundPost.likes.includes(currentUserId));
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, currentUserId]);

  useEffect(() => {
    if (!post?.userId) return;

    const fetchAuthor = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data: Author[] = await response.json();
        const foundAuthor = data.find((u) => u._id === post.userId);
        if (foundAuthor) {
          setAuthor(foundAuthor);
        }
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchAuthor();
  }, [post]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `isLiked_${postId}_${currentUserId}`,
        JSON.stringify(isLiked),
      );
    }
  }, [isLiked, postId, currentUserId]);

  const handleLike = async () => {
    try {
      const response = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) throw new Error("Error liking post");

      const data: { likes: string[] } = await response.json();
      setIsLiked(data.likes.includes(currentUserId));
      setPost((prevPost) =>
        prevPost ? { ...prevPost, likes: data.likes } : prevPost,
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <>
      {post ? (
        <div className="overflow-hidden relative border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[2px] p-3 light-text border rounded-3xl shadow-md">
          <div className="grain"></div>
          <Link
            href={`/profile/${author?._id}`}
            className="flex items-center space-x-4 mb-4"
          >
            {author?.profileUrl ? (
              <img
                src={author.profileUrl}
                alt={author.username}
                className="w-8 h-8 rounded-full border"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            )}
            <div>
              <p className="font-semibold">
                {author?.username || "Unknown Author"}
              </p>
            </div>
          </Link>
          <p className="mb-4">{post.text}</p>
          <div className="flex justify-between">
            <p className="text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <div className="flex justify-end gap-5 text-sm">
              <button onClick={handleLike} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-colors ${isLiked ? "text-red-500" : "text-gray-500"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18.35l-1.45-1.32C5.4 13.92 2 11.28 2 8.5 2 6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C11.46 5.99 12.96 5 14.5 5c2 0 3.5 1.5 3.5 3.5 0 2.78-3.4 5.42-6.55 8.54L10 18.35z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-1">{post.likes.length}</span>
              </button>
              <p>💬 {post.comments.length}</p>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </>
  );
}
