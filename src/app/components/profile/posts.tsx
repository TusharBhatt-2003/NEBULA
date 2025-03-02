import useUser from "@/app/hooks/useUser";
import { useEffect, useState } from "react";

export const Post = () => {
  const { user } = useUser();
  const currentUserId = user?._id;
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          console.error(data.message || "Error fetching posts.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts to only include those that match the current user's ID
  const filteredPosts = posts.filter((post) => post.user === currentUserId);

  return (
    <div className="border-t-2 light-text border-[#f2f0e4]">
      <h1 className="font-['spring'] light-text border-b w-fit">POSTS:</h1>
      <div className="flex flex-col gap-2 py-2">
        {loading ? (
          <p>Loading...</p>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div
              key={index}
              className="p-2 border rounded-xl flex justify-between border-[#f2f0e4]"
            >
              <p>{post.content}</p>
              <div className="flex gap-2">
                <span className="ml-1">{post.likes.length}❤️</span>
                <p>{post.comments.length}💬</p>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found for this user.</p>
        )}
      </div>
    </div>
  );
};
