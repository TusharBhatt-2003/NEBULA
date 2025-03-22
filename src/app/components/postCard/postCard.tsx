"use client";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Skeleton from "./skeleton";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ConfirmationModal from "../confirmationModal";
import { motion } from "motion/react";
import TagLink from "../tag";
import { FaComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

interface Author {
  _id: string;
  username: string;
  profileUrl: string;
}

interface PostCardProps {
  postId: string;
  currentUserId: string;
  onDelete?: (postId: string) => void;
  image: string;
  tags: string[];
  text: string;
  authorId: string;
  username: string;
  profileUrl: string;
  comments?: string[];
  likes: { _id: string }[];
}

export default function PostCard({
  postId,
  currentUserId,
  image,
  text,
  tags,
  authorId,
  profileUrl,
  username,
  comments,
  likes,
  onDelete,
}: PostCardProps) {
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  const [isLiked, setIsLiked] = useState<boolean>(
    likes.some((like) => like._id === currentUserId),
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const isFeedPage = pathname === `/post/${postId}`;
  const hideAuthorInfo =
    pathname === "/profile" || pathname === `/profile/${authorId}`;
  const isTagPage = pathname.startsWith("/tag/");
  const postText =
    text.length > 100 && !isFeedPage ? `${text.substring(0, 100)}...` : text;

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data: Author[] = await response.json();
        const foundAuthor = data.find((u) => u._id === authorId);
        if (foundAuthor) {
          setAuthor(foundAuthor);
        }
      } catch (error) {
        console.error("Error fetching author:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  const handleLike = async () => {
    const updatedLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    setLikeCount(updatedLikeCount);
    setIsLiked(!isLiked);

    try {
      const response = await fetch("/api/posts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      if (!response.ok) throw new Error("Failed to like/unlike post");
    } catch (error) {
      console.error("Error liking post:", error);
      // Revert UI changes
      setLikeCount(likeCount);
      setIsLiked(isLiked);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/posts/delete-post", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) throw new Error("Failed to delete post");
      router.push("/profile"); // Navigate to profile if on different page
      if (onDelete) {
        onDelete(postId);
      }

      if (pathname.startsWith("/profile")) {
        router.refresh(); // Refresh profile page to reflect deletion
      } else {
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setShowModal(false);
    }
  };

  if (loading) return <Skeleton authorId={authorId} />;
  return (
    <>
      <motion.div
        initial={{ opacity: 1, y: 0, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: "easeIn",
          type: "spring",
          damping: 20,
        }}
        className={`overflow-hidden flex flex-col justify-center relative border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[5px] p-3 light-text border rounded-3xl`}
      >
        <div className="grain z-[-9]"></div>

        {!hideAuthorInfo && (
          <Link
            href={`/profile/${authorId}`}
            className="flex items-center gap-2 mb-2"
          >
            {profileUrl ? (
              <img
                src={profileUrl}
                alt={username}
                className="w-8 h-8 rounded-full aspect-square"
              />
            ) : (
              <div className="w-8 h-8 rounded-full light-bg opacity-20"></div>
            )}
            <p className="font-semibold">{username}</p>
          </Link>
        )}

        <Link href={`/post/${postId}`}>
          {image && (
            <motion.img
              initial={{ opacity: 1, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                ease: "easeIn",
                type: "spring",
                damping: 15,
              }}
              whileTap={{ scale: 0.9 }}
              src={image}
              alt="Post Image"
              className="w-full z-[999] rounded-xl mb-2"
            />
          )}
          <motion.p
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
              ease: "easeIn",
              type: "spring",
              damping: 15,
            }}
            whileTap={{ scale: 0.9 }}
          >
            {postText}
          </motion.p>
        </Link>

        {!hideAuthorInfo && (
          <div>
            <div className="flex my-2 justify-between items-end">
              {!isTagPage && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <TagLink
                      className="text-xs opacity-50"
                      key={index}
                      tag={tag}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className={`flex items-end w-full  justify-end gap-1 text-sm`}>
              <div className="flex bg-black h-fit opacity-70 rounded-3xl px-2 py-1 items-center">
                <FaComment className="w-5 h-5" />
                <span className="ml-1">{comments?.length}</span>
              </div>

              <motion.button
                onClick={handleLike}
                className="flex bg-black h-fit opacity-70 rounded-3xl px-2 py-1 items-center"
              >
                <motion.div
                  animate={{
                    scale: isLiked ? [0, 3, 1.2] : 1,
                    rotate: isLiked ? [0, 360] : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <FcLike className={`w-5 h-5 ${isLiked ? "" : "grayscale"}`} />
                </motion.div>
                <span className="ml-1">{likeCount}</span>
              </motion.button>

              {authorId === currentUserId && (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-light opacity-50 bg-black rounded-xl px-2 py-1 flex items-center gap-1"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>

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
