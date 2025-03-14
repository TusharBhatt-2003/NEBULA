"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/postCard/postCard";
import useUser from "../hooks/useUser";
import { Input } from "../components/ui/input";
import Link from "next/link";
import StarField from "../components/starField";
import Loading from "../components/loading";
import TagLink from "../components/tag";

interface User {
  _id: string;
  username: string;
  profileUrl: string;
}

interface Post {
  _id: string;
  likes: { _id: string }[]; // Assuming likes are an array of objects with an `_id` field
  createdAt: number;
  tags: string[];
  image: string;
  text: string;
  userId: string;
  author: {
    username: string;
    profileUrl: string;
  };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const currentUserId = user?._id ?? "";

  // Fetch all tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("/api/tags");
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (query.trim()) {
          const [userRes, postRes] = await Promise.all([
            axios.get(`/api/users?search=${query}`),
            axios.get(`/api/posts?search=${query}`),
          ]);

          setUsers(
            userRes.data.filter((user: User) =>
              user.username.toLowerCase().includes(query.toLowerCase()),
            ),
          );

          setPosts(
            postRes.data.filter((post: Post) =>
              post.text.toLowerCase().includes(query.toLowerCase()),
            ),
          );
        } else {
          // Fetch all posts if query is empty
          const postRes = await axios.get("/api/posts");
          setPosts(postRes.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };

    const delayDebounce = setTimeout(fetchData, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Sort posts by likes and get the top 5
  const topPosts = posts
    .sort((a, b) => b.likes.length - a.likes.length) // Sort by number of likes in descending order
    .slice(0, 10); // Get top 5 posts

  return (
    <div className="lg:w-[25vw] relative light-text p-5 pb-24 overflow-hidden">
      <div className="fixed -z-50">
        <StarField />
      </div>
      <div>
        <div className="fixed right-0 top-0 px-5 pt-5 left-0 backdrop-blur z-[99999999]">
          <p className="text-4xl mb-5 text-center text-transparent bg-clip-text animate-gradient-para z-50 font-['LogoFont'] font-semibold">
            SEARCH
          </p>
          <Input
            className=""
            type="text"
            placeholder="Search users and posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {loading && <Loading />}

        <div className="overflow-hidden py-2 pt-24">
          {/* Users Section */}
          <div className="mt-4">
            {users.length > 0 ? (
              <ul className="space-y-3">
                <h2 className="text-lg font-semibold font-['spring']">
                  Users :
                </h2>
                {users.map((user) => (
                  <Link
                    href={`/profile/${user._id}`}
                    key={user._id}
                    className="flex gap-2 items-center overflow-hidden relative border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[2px] p-3 light-text border rounded-3xl"
                  >
                    <div className="grain"></div>
                    <img
                      src={user.profileUrl}
                      className="w-12 h-12 aspect-square rounded-xl"
                    />
                    <p>{user.username}</p>
                  </Link>
                ))}
              </ul>
            ) : (
              <>
                {/* Tags Section */}
                <div className="mt-4">
                  {tags.length > 0 && (
                    <div className="space-y-3">
                      <h2 className="text-lg font-semibold font-['spring'] mb-2">
                        Tags :
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <TagLink key={index} tag={tag} index={index} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Top 5 Posts Section */}
          <div className="mt-4">
            {topPosts.length > 0 ? (
              <div className="columns-2 space-y-5">
                <h2 className="text-lg  font-semibold font-['spring'] mb-2">
                  Top 10 Posts:
                </h2>
                {topPosts.map((post) => (
                  <PostCard
                    key={post._id}
                    image={post.image}
                    text={post.text}
                    tags={post.tags}
                    currentUserId={currentUserId}
                    postId={post._id}
                    authorId={post.userId}
                    username={post.author?.username || "Unknown User"}
                    profileUrl={
                      post.author?.profileUrl || "/default-profile.png"
                    }
                    likes={post.likes}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {/* No Results Found */}
          {!loading &&
            query.trim() &&
            users.length === 0 &&
            topPosts.length === 0 && (
              <p className="text-center font-['spring'] text-5xl font-bold mt-6 light-text opacity-30">
                No results found
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
