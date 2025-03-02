"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import StarField from "../components/starField";
import { Button } from "../components/ui/button";

interface PostData {
  text: string;
  [key: string]: string | undefined;
}

export default function AddPost() {
  const [post, setPost] = useState<PostData>({ text: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to control pop-up visibility
  const [popupMessage, setPopupMessage] = useState(""); // State to store pop-up message
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
        body: JSON.stringify({ text: post.text }), // Only send `text`
      });

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}: ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (data.success) {
        setPopupMessage("Post uploaded successfully!"); // Set success message
        setShowPopup(true); // Show pop-up
        setTimeout(() => {
          setShowPopup(false); // Hide pop-up after 1.5 seconds
          router.push("/feed"); // Redirect to feed
        }, 1500);
      } else {
        setPopupMessage(data.error || "Failed to upload post"); // Set error message
        setShowPopup(true); // Show pop-up
        setTimeout(() => setShowPopup(false), 1500); // Hide pop-up after 1.5 seconds
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
    <div className="relative lg:w-[25vw] lg:fixed lg:ml-[75vw] w-full h-screen flex flex-col justify-start items-center overflow-hidden p-10">
      <StarField />
      <h1 className="text-4xl text-center text-transparent bg-clip-text animate-gradient-para z-50 font-['LogoFont'] font-semibold">
        Create Post
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col z-20 h-full items-center gap-5"
      >
        <textarea
          className="flex light-text w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#f2f0e4]/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          placeholder="Enter your text..."
          value={post.text}
          onChange={(e) => setPost({ ...post, text: e.target.value })}
          rows={4}
        />
        <Button type="submit" disabled={loading || !post.text}>
          {loading ? "Posting..." : "Post"}
        </Button>
      </form>

      {/* Pop-up */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 light-text flex backdrop-blur gap-5 py-5 px-10 rounded-xl border border-[#F2F0E4]/30 flex-col items-center justify-center overflow-hidden">
          <div className="grain"></div>
          {popupMessage}
        </div>
      )}

      {/* Error message */}
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}
