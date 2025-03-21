"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import ProfilePictureUpdate from "../components/imagekit/profilePictureUpdate";
import StarField from "../components/starField";
import PopupAlert from "../components/PopupAlert"; // Import the popup

export default function AddPost() {
  const [post, setPost] = useState<{
    text: string;
    image?: string;
    tags: string[];
  }>({
    text: "",
    image: "",
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [tagInput, setTagInput] = useState(""); // For tracking tag input
  const [filteredTags, setFilteredTags] = useState<string[]>([]); // For storing filtered tags based on input
  const [existingTags, setExistingTags] = useState<string[]>([]); // State for fetched tags from API
  const router = useRouter();

  // Fetch tags from the API when the component mounts
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tags");
        if (!response.ok) throw new Error("Failed to fetch tags");
        const data = await response.json();
        //console.log("Fetched tags:", data); // Log here
        setExistingTags(data);
      } catch (error) {
        //console.error(error);
        setMessage("Failed to load tags");
      }
    };
    fetchTags();
  }, []);

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
        setShowPopup(true); // Show popup
        setTimeout(() => {
          setShowPopup(false);
          router.push("/feed");
        }, 2000); // Auto-dismiss after 2 seconds
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

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTagInput(input);

    // Filter existing tags based on user input
    const filtered = existingTags.filter((tag) =>
      tag.toLowerCase().includes(input.toLowerCase()),
    );
    setFilteredTags(filtered);
  };

  const addTag = (tag: string) => {
    // Only add the tag if it doesn't already exist
    if (!post.tags.includes(tag)) {
      setPost({
        ...post,
        tags: [...post.tags, tag],
      });
    }
    setTagInput(""); // Reset input field
    setFilteredTags([]); // Clear suggestions
  };

  const removeTag = (tag: string) => {
    setPost({
      ...post,
      tags: post.tags.filter((t) => t !== tag),
    });
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // console.log("Input:", value); // Debug input
    // console.log("Existing tags:", existingTags); // Debug fetched tags

    if (value.endsWith(" ")) {
      const trimmedInput = value.trim();
      if (trimmedInput !== "") {
        addTag(trimmedInput);
      }
    } else {
      setTagInput(value);

      // Filter tags when user is typing
      const filtered = existingTags.filter((tag) =>
        tag.toLowerCase().includes(value.toLowerCase()),
      );
      //console.log("Filtered tags:", filtered); // Debug filtered results
      setFilteredTags(filtered);
    }
  };

  // onKeyDown handler: detect Enter and Backspace
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedInput = tagInput.trim();

    if (e.key === "Enter" && trimmedInput !== "") {
      e.preventDefault(); // Prevent form submit
      addTag(trimmedInput);
    } else if (e.key === "Backspace" && tagInput === "") {
      e.preventDefault(); // Prevent browser back on mobile
      const lastTag = post.tags[post.tags.length - 1];
      if (lastTag) removeTag(lastTag);
    }
  };

  return (
    <div className="p-5 container mx-auto h-full overflow-hidden relative">
      <div className="fixed">
        <StarField />
      </div>
      <h1 className="text-4xl mb-5 text-center text-transparent bg-clip-text animate-gradient-para z-50 font-['LogoFont'] font-semibold">
        Create Post
      </h1>
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden relative border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[2px] p-3 light-text border rounded-3xl flex flex-col items-center justify-center gap-4"
      >
        <div className="grain"></div>
        {!post.image && (
          <div className="flex flex-col gap-2 relative">
            <p className="text-lg text-center">
              Choose an image to attach to your post.
            </p>
            <ProfilePictureUpdate
              onUploadSuccess={(url) => setPost({ ...post, image: url })}
            />
          </div>
        )}

        {post.image && (
          <img
            src={post.image}
            alt="Chosen Image"
            className="w-48 z-[999] border border-[#F2F0E4]/30 rounded-3xl shadow-md"
          />
        )}

        <textarea
          className="border border-[#F2F0E4]/30 backdrop-blur-lg p-2 w-full bg-transparent text-light rounded-3xl outline-none placeholder:text-[#F2F0E4]/30"
          placeholder="Enter your text..."
          value={post.text}
          onChange={(e) => setPost({ ...post, text: e.target.value })}
          rows={4}
        />

        <input
          type="text"
          className="border border-[#F2F0E4]/30 backdrop-blur-lg p-2 w-full bg-transparent text-light rounded-3xl outline-none placeholder:text-[#F2F0E4]/30"
          placeholder="Enter tags (space-separated)"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleTagKeyDown}
        />

        {filteredTags.length > 0 && (
          <ul className="z-50 absolute mt-1 p-2 border border-[#F2F0E4]/30 rounded-xl w-fit max-h-48 overflow-y-auto backdrop-blur-lg bg-black/50">
            {filteredTags.map((tag, index) => (
              <li
                key={index}
                className="px-3 py-1 text-lg border-b border-[#F2F0E4]/30 font-bold cursor-pointer"
                onClick={() => addTag(tag)}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="light-bg text-black font-bold px-3 py-1 rounded-xl text-sm flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                className="text-lg"
                onClick={() => removeTag(tag)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>

        <Button type="submit" disabled={loading || !post.text}>
          {loading ? "Posting..." : "Post"}
        </Button>
        {message && <p className="text-red-500">{message}</p>}
      </form>

      {/* Popup Alert when post is uploaded */}
      {showPopup && <PopupAlert alertMessage="Post uploaded successfully!" />}
    </div>
  );
}
