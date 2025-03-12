"use client";
import PostCard from "@/app/components/postCard/postCard";
import useUser from "@/app/hooks/useUser";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";

interface Post {
  _id: string;
  userId: string;
  image?: string;
  text: string;
  likes: { _id: string }[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
}

export default function Page() {
  const { id: postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const loggedUserData = useUser();
  const currentUserId = loggedUserData?.user?._id;

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

    fetchPost();
  }, [postId, currentUserId]);

  return (
    <>
      <Head>
        <title>
          {post ? `${post.text.slice(0, 50)}... | YourSite` : "Loading Post..."}
        </title>
        <meta
          name="description"
          content={post ? post.text.slice(0, 150) : "Viewing post details"}
        />
        <meta
          property="og:title"
          content={post ? post.text.slice(0, 50) : "Post Details"}
        />
        <meta
          property="og:description"
          content={
            post ? post.text.slice(0, 150) : "Read this amazing post now!"
          }
        />
        <meta
          property="og:image"
          content={post?.image || "/default-image.jpg"}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://nebula-socialmedia.vercel.app/post/${postId}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={post ? post.text.slice(0, 50) : "Post Details"}
        />
        <meta
          name="twitter:description"
          content={
            post ? post.text.slice(0, 150) : "Read this amazing post now!"
          }
        />
        <meta name="twitter:image" content={post?.image} />
        <link
          rel="canonical"
          href={`https://nebula-socialmedia.vercel.app/post/${postId}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post?.text.slice(0, 50) || "Post Details",
            description:
              post?.text.slice(0, 150) || "Read this post on our platform.",
            image: post?.image || "/default-image.jpg",
            author: {
              "@type": "Person",
              name: "Author Name",
            },
            datePublished: post?.createdAt || new Date().toISOString(),
            dateModified: post?.updatedAt || new Date().toISOString(),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://yoursite.com/post/${postId}`,
            },
          })}
        </script>
      </Head>

      <div className="p-10 container mx-auto">
        <PostCard
          currentUserId={currentUserId ?? ""}
          postId={postId as string}
        />
      </div>
    </>
  );
}
