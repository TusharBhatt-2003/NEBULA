"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import ProfilePictureUpdate from "../components/imagekit/profilePictureUpdate";

export default function AddPost() {
  const [post, setPost] = useState<{ text: string; image?: string }>({
    text: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/users/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(post),
      });

      if (!response.ok)
        throw new Error(
          `Server returned ${response.status}: ${response.statusText}`,
        );

      const data = await response.json();
      if (data.success) {
        alert("Post uploaded successfully!");
        router.push("/feed");
      } else {
        setMessage(data.error || "Failed to upload post");
      }
    } catch (error: any) {
      setMessage(
        error.message || "An error occurred while uploading the post.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Create Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="border p-2 rounded"
          placeholder="Enter your text..."
          value={post.text}
          onChange={(e) => setPost({ ...post, text: e.target.value })}
          rows={4}
        />
        <ProfilePictureUpdate
          onUploadSuccess={(url) => setPost({ ...post, image: url })}
        />
        <Button type="submit" disabled={loading || !post.text}>
          {loading ? "Posting..." : "Post"}
        </Button>
        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
}
