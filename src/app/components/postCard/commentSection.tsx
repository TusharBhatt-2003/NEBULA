"use client";

import React, { useState } from "react";
import GrainContainer from "../grainContainer";
import useUser from "@/app/hooks/useUser";
import { FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";

interface Comment {
  _id: string;
  userId: string;
  username: string;
  profileUrl: string;
  text: string;
  createdAt: string;
}

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
  onNewComment: (updatedComments: Comment[]) => void;
}

export default function CommentSection({
  postId,
  initialComments,
  onNewComment,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentText, setCommentText] = useState("");
  const user = useUser(); // Assuming this returns the current user's id as a string
  const currentUserId = user.user?._id;
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await fetch(`/api/posts/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: commentText, postId }),
      });

      const data = await res.json();
      if (res.ok) {
        setComments(data.updatedPost.comments);
        onNewComment(data.updatedPost.comments);
        setCommentText("");
      }
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const res = await fetch(`/api/posts/delete-comments`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, commentId }),
      });

      const data = await res.json();
      if (res.ok) {
        setComments(data.updatedPost.comments);
        onNewComment(data.updatedPost.comments);
      }
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  return (
    <div className="space-y-3 w-full">
      <h2 className="text-xl font-bold">Comments</h2>
      <textarea
        className="w-full border-[#F2F0E4]/30 z-10 backdrop-blur-[2px] border p-4 rounded-3xl bg-transparent text-light placeholder:text-white/50"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <div className="flex w-full justify-end">
        <Button onClick={handleCommentSubmit}>Post Comment</Button>
      </div>

      {comments.map((comment) => (
        <GrainContainer
          key={comment._id}
          className="flex flex-col mx-0 w-full mt-4 relative"
        >
          <div className="flex items-center w-fit border border-[#F2F0E4]/30  rounded-3xl py-2 px-3 gap-2">
            {comment.profileUrl ? (
              <img
                src={comment.profileUrl}
                alt={comment.username}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
                N/A
              </div>
            )}
            <div className="">{comment.username || "Unknown User"}</div>
          </div>

          <div className="flex p-2 justify-between">
            <p>{comment.text}</p>

            {comment.userId === currentUserId && (
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="text-light opacity-50 bg-black rounded-xl px-4 py-2 flex items-center gap-1"
              >
                <FaTrash className="w-5 h-5" />
              </button>
            )}
          </div>
        </GrainContainer>
      ))}
    </div>
  );
}
