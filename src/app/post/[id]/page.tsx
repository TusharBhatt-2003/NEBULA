"use client";
import PostCard from "@/app/components/postCard/postCard";
import useUser from "@/app/hooks/useUser";
import React from "react";
import { useParams } from "next/navigation";

export default function page() {
  const { id: postId } = useParams();

  const loggedUserData = useUser();
  const currentUserId = loggedUserData?.user?._id;

  return (
    <div className="p-10 container mx-auto">
      <PostCard currentUserId={currentUserId ?? ""} postId={postId as string} />
    </div>
  );
}
