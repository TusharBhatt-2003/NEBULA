"use client";

import PostCard from "@/app/components/postCard/postCard";
import useUser from "@/app/hooks/useUser";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Skeleton from "@/app/components/postCard/skeleton";
import CommentSection from "@/app/components/postCard/commentSection";

interface Comment {
  _id: string;
  userId: string;
  username: string;
  profileUrl: string;
  text: string;
  createdAt: string;
}

interface Post {
  _id: string;
  userId: string;
  image: string;
  text: string;
  tags: string[];
  likes: { _id: string }[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  author: {
    username: string;
    profileUrl: string;
  };
}

export default function Page() {
  const params = useParams();
  const postId = typeof params.id === "string" ? params.id : "";
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const loggedUserData = useUser();
  const currentUserId = loggedUserData?.user?._id || "";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data: Post[] = await response.json();
        const foundPost = data.find((p) => p._id === postId);
        if (foundPost) {
          setPost(foundPost);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  const handleNewComment = (updatedComments: Comment[]) => {
    if (post) {
      setPost({ ...post, comments: updatedComments });
    }
  };

  return (
    <>
      <Head>
        <title>
          {post ? `${post.text.slice(0, 50)}... | Nebula` : "Loading Post..."}
        </title>
        <meta
          name="description"
          content={post ? post.text.slice(0, 150) : "Viewing post details"}
        />
      </Head>

      <main className="space-y-5 h-full flex justify-center container p-5 mx-auto pb-36">
        <div className="lg:w-[50%] gap-5 lg:flex">
          {!loading && post ? (
            <PostCard
              image={post.image}
              text={post.text}
              tags={post.tags || []}
              currentUserId={currentUserId}
              postId={post._id}
              authorId={post.userId}
              username={post.author?.username}
              profileUrl={post.author?.profileUrl}
              likes={post.likes}
            />
          ) : (
            <Skeleton />
          )}

          {!loading && post && (
            <CommentSection
              postId={post._id}
              initialComments={post.comments}
              onNewComment={handleNewComment}
            />
          )}
        </div>
      </main>
    </>
  );
}
