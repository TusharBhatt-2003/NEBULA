"use client";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Skeleton from "./skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ConfirmationModal from "../confirmationModal";
import { motion } from "motion/react";
import TagLink from "../tag";
import { useImageColors } from "@/app/hooks/useImageColors";

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
  likes,
  onDelete,
}: PostCardProps) {
  const { dominantColor, palette, isLoading, error } = useImageColors(image);
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  const [isLiked, setIsLiked] = useState<boolean>(
    likes.some((like) => like._id === currentUserId),
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const pathname = usePathname();

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

      if (onDelete) onDelete(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setShowModal(false);
    }
  };

  if (loading) return <Skeleton authorId={authorId} />;

  const getRGBAColor = (rgbColor: string, opacity: number) => {
    const rgbValues = rgbColor.match(/\d+/g);
    if (!rgbValues || rgbValues.length < 3) return "transparent";

    const [r, g, b] = rgbValues;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Choose a vibrant or appealing color from the palette
  const getCatchyColor = () => {
    if (palette?.Vibrant) return palette.Vibrant;
    if (palette?.LightVibrant) return palette.LightVibrant;
    if (palette?.Muted) return palette.Muted;
    return dominantColor;
  };

  const catchyColor = getCatchyColor();

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
        style={{
          backgroundColor: dominantColor
            ? getRGBAColor(dominantColor, 0.1)
            : "transparent",
        }}
      >
        <div className="grain"></div>

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
              className="w-full rounded-2xl mb-2"
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
          <div className="flex justify-between items-end">
            {!isTagPage && (
              <div className="flex flex-wrap w-3/4 gap-2">
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

            <div
              className={`flex items-end ${isTagPage ? "w-full" : "w-1/4"} justify-end gap-1 text-sm`}
            >
              <motion.button
                onClick={handleLike}
                className="flex bg-black h-fit opacity-70 rounded-3xl px-4 py-2 items-center"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill={isLiked ? "red" : "gray"}
                  className="w-5 h-5"
                  animate={{ scale: isLiked ? [0, 3, 1.2] : 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18.35l-1.45-1.32C5.4 13.92 2 11.28 2 8.5 2 6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C11.46 5.99 12.96 5 14.5 5c2 0 3.5 1.5 3.5 3.5 0 2.78-3.4 5.42-6.55 8.54L10 18.35z"
                    clipRule="evenodd"
                  />
                </motion.svg>
                <span className="ml-1">{likeCount}</span>
              </motion.button>

              {authorId === currentUserId && (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-light opacity-50 bg-black rounded-xl px-4 py-2 flex items-center gap-1"
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
