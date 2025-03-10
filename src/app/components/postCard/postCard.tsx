"use client";

import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import trash icon
import Skeleton from "./skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ConfirmationModal from "../confirmationModal";

interface Post {
  _id: string;
  userId: string;
  text: string;
  likes: { _id: string }[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
}

interface Author {
  _id: string;
  username: string;
  profileUrl: string;
}

interface PostCardProps {
  postId: string;
  currentUserId: string;
  onDelete?: (postId: string) => void;
}

export default function PostCard({
  postId,
  currentUserId,
  onDelete,
}: PostCardProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data: Post[] = await response.json();
        const foundPost = data.find((p) => p._id === postId);
        if (foundPost) {
          setPost(foundPost);
          setIsLiked(
            foundPost.likes.some((like) => like._id === currentUserId),
          );
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

  const handleLike = async () => {
    if (!post) return;

    try {
      const response = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post._id }),
      });

      if (!response.ok) throw new Error("Failed to like/unlike post");

      setPost((prev) =>
        prev
          ? {
              ...prev,
              likes: isLiked
                ? prev.likes.filter((like) => like._id !== currentUserId)
                : [...prev.likes, { _id: currentUserId }],
            }
          : prev,
      );

      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    try {
      const response = await fetch("/api/posts/delete-post", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post._id }),
      });

      if (!response.ok) throw new Error("Failed to delete post");

      if (onDelete) onDelete(post._id);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setShowModal(false);
    }
  };

  const isFeedPage = pathname === `/post/${post?._id}`;
  const postText =
    isFeedPage && post?.text && post.text.length > 100
      ? post?.text || ""
      : `${post?.text.substring(0, 100)}...`;

  return (
    <>
      {post ? (
        <div className="overflow-hidden relative border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[2px] p-3 light-text border rounded-3xl">
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
              <div className="w-8 h-8 rounded-full bg-gray-300 opacity-20"></div>
            )}
            <p className="font-semibold">{author?.username || null}</p>
          </Link>
          <Link href={`/post/${post?._id}`}>
            <p className="mb-4">{postText}</p>
          </Link>
          <div className="flex justify-between">
            <p className="text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <div className="flex gap-5 text-sm">
              <button onClick={handleLike} className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill={isLiked ? "red" : "gray"}
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18.35l-1.45-1.32C5.4 13.92 2 11.28 2 8.5 2 6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C11.46 5.99 12.96 5 14.5 5c2 0 3.5 1.5 3.5 3.5 0 2.78-3.4 5.42-6.55 8.54L10 18.35z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-1">{post.likes.length}</span>
              </button>
              {post.userId === currentUserId && (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-red-500 flex items-center gap-1"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}

      {/* Confirmation Modal for Deletion */}
      {showModal && (
        <ConfirmationModal
          sentence="Are you sure you want to delete this post?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}
