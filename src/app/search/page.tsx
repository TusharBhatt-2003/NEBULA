"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/postCard/postCard";
import useUser from "../hooks/useUser";
import { Input } from "../components/ui/input";
import Link from "next/link";
import StarField from "../components/starField";

interface User {
  _id: string;
  username: string;
  profileUrl: string;
}

interface Post {
  _id: string;
  text: string;
  createdAt: number;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const currentUserId = user?._id ?? "";

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      setPosts([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
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
      } catch (error) {
        console.error("Error fetching data", error);
      }
      setLoading(false);
    };

    const delayDebounce = setTimeout(fetchData, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="min-h-screen relative light-text p-5 pb-20 overflow-hidden">
      {/* <div className="fixed">
        <StarField />
      </div> */}
      <div className="max-w-2xl z-[99] mx-auto p-4 rounded-lg shadow-lg">
        <Input
          type="text"
          placeholder="Search users and posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && <p className="text-gray-500 mt-2">Loading...</p>}

        {/* Users Section */}
        <div className="mt-4">
          {users.length > 0 ? (
            <ul className="space-y-3">
              <h2 className="text-lg font-semibold font-['spring']">Users</h2>
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
          ) : null}
        </div>

        {/* Posts Section */}
        <div className="mt-4">
          {posts.length > 0 ? (
            <div className="">
              <h2 className="text-lg font-semibold font-['spring'] mb-2">
                Posts
              </h2>
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  currentUserId={currentUserId}
                  postId={post._id}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
