"use client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import PostCard from "../components/postCard/postCard";
import useUser from "../hooks/useUser";
import { Input } from "../components/ui/input";
import Link from "next/link";
import StarField from "../components/starField";
import Loading from "../components/loading";
import TagLink from "../components/tag";
import { Search } from "lucide-react";

interface User {
  _id: string;
  username: string;
  profileUrl: string;
  followingTags: string[];
  bio: string;
  city: string;
}

interface Post {
  _id: string;
  likes: { _id: string }[]; // Assuming likes are an array of objects with an `_id` field
  createdAt: number;
  tags: string[];
  image: string;
  text: string;
  comments: string[];
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

  const sortedPosts = useMemo(() => {
    const now = Date.now();
    return posts
      .map((post) => {
        const ageInHours = (now - post.createdAt) / (1000 * 60 * 60);
        const recencyScore = 1 / (1 + ageInHours);
        const likeScore = post.likes.length;
        const commentScore = post.comments.length;
        const totalScore =
          recencyScore * 2 + likeScore * 1.5 + commentScore * 1.2;
        const randomFactor = Math.random();
        return { ...post, weightedScore: totalScore * randomFactor };
      })
      .sort((a, b) => b.weightedScore - a.weightedScore);
  }, [posts]);

  const topPosts = sortedPosts.slice(0, 10);

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

  // console.log(posts);

  return (
    <div className="container mx-auto relative light-text p-5 pb-24 overflow-hidden">
      <div className="fixed -z-50">
        <StarField />
      </div>
      <div>
        <div className="fixed right-0 top-0 px-5 pt-5 left-0 backdrop-blur z-[99999999]">
          <p className="text-4xl mb-5 text-center text-transparent bg-clip-text animate-gradient-para z-50 font-['LogoFont'] font-semibold">
            SEARCH
          </p>
          <div className="relative  mx-auto  container">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f2f0e4]/70 w-5 h-5 pointer-events-none" />
            <Input
              className="pl-10" // padding left for the icon
              type="text"
              placeholder="Search users and posts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        {loading && <Loading />}

        <div className="overflow-hidden py-2 pt-24">
          {/* Users Section */}
          <div className="mt-4">
            {users.length > 0 ? (
              <ul className="space-y-3">
                {/* <h2 className="text-lg font-semibold font-['spring']">
                  Users :
                </h2> */}
                {users.map((user) => (
                  <Link
                    href={`/profile/${user._id}`}
                    key={user._id}
                    className="flex flex-col gap-2 justify-between  overflow-hidden relative border-[#F2F0E4]/30 z-10 w-full backdrop-blur-[2px] p-3 light-text border rounded-3xl"
                  >
                    <div className="grain"></div>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <img
                          src={user.profileUrl}
                          className="w-12 h-12 aspect-square rounded-xl"
                        />
                        <p className="light-bg rounded-3xl text-black px-2 h-fit w-fit">
                          @{user.username}
                        </p>
                      </div>
                      <p>Tags followed: {user.followingTags.length}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-left w-2/3 source-code lowercase text-sm">
                        {user.bio}
                      </p>
                      <p className="light-bg h-fit text-black rounded-3xl px-2 py-1 opacity-20">
                        {user.city}
                      </p>
                    </div>
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
              <div className="columns-2 md:columns-3  lg:columns-4 space-y-5">
                {/* <h2 className="text-lg  font-semibold font-['spring'] mb-2">
                  Top 10 Posts:
                </h2> */}
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
                    comments={post.comments}
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
