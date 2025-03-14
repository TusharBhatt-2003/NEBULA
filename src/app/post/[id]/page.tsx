"use client";
import PostCard from "@/app/components/postCard/postCard";
import useUser from "@/app/hooks/useUser";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Skeleton from "@/app/components/postCard/skeleton";

interface Post {
  _id: string;
  userId: string;
  image: string;
  text: string;
  tags: string[];
  likes: { _id: string }[];
  comments: string[];
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
  }, [postId, currentUserId]);

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
        <meta
          name="twitter:image"
          content={post?.image || "/default-image.jpg"}
        />
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
              name: post?.author?.username || "Unknown Author",
            },
            datePublished: post?.createdAt || new Date().toISOString(),
            dateModified: post?.updatedAt || new Date().toISOString(),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://nebula-socialmedia.vercel.app/post/${postId}`,
            },
          })}
        </script>
      </Head>

      <main className="h-full space-y-5 container p-5  mx-auto pb-36">
        <div className="">
          {!loading && post ? (
            <PostCard
              image={post.image}
              text={post.text}
              tags={post.tags || ""}
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
        </div>
        <h1 className="overflow-hidden flex flex-col justify-center relative border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[2px] p-3 light-text font-semibold border rounded-3xl  text-center font-['spring'] text-light text-4xl">
          <div className="grain"></div>
          The Comments Section will be added soon.
        </h1>
      </main>
    </>
  );
}
