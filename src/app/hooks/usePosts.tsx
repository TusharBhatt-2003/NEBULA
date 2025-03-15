"use client";
import { useEffect, useState } from "react";

interface Post {
  _id: string;
  userId: string;
  image?: string;
  tags?: string[];
  text: string;
  likes: { _id: string }[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
}

export default function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getPostById = (postId: string) =>
    posts.find((post) => post._id === postId) || null;

  return { posts, getPostById, loading, error };
}
