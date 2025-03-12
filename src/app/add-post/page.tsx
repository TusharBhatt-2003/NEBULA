"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import ProfilePictureUpdate from "../components/imagekit/profilePictureUpdate";
import StarField from "../components/starField";

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
    <div className="p-5 overflow-hidden relative">
      <div className="fixed">
        <StarField />
      </div>
      <h1 className="text-4xl mb-5 text-center text-transparent bg-clip-text animate-gradient-para z-50 font-['LogoFont'] font-semibold">
        Create Post
      </h1>
      <form
        onSubmit={handleSubmit}
        className=" overflow-hidden relative border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[2px] p-3 light-text border rounded-3xl flex flex-col items-center justify-center  gap-4"
      >
        <div className="grain"></div>
        {!post.image && (
          <div className="flex flex-col gap-2">
            <p className="text-lg text-center">
              Choose an image to attach to your post.
            </p>
            <ProfilePictureUpdate
              onUploadSuccess={(url) => setPost({ ...post, image: url })}
            />
          </div>
        )}

        {/* Display the chosen image */}
        {post.image && (
          <img
            src={post.image}
            alt="Chosen Image"
            className="w-60 z-[999] border border-[#F2F0E4]/30 rounded-xl shadow-md"
          />
        )}

        <textarea
          className="border border-[#F2F0E4]/30 backdrop-blur-lg p-2 w-full bg-transparent text-light rounded-xl outline-none placeholder:text-[#F2F0E4]/30"
          placeholder="Enter your text..."
          value={post.text}
          onChange={(e) => setPost({ ...post, text: e.target.value })}
          rows={4}
        />
        <Button type="submit" disabled={loading || !post.text}>
          {loading ? "Posting..." : "Post"}
        </Button>
        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
}
