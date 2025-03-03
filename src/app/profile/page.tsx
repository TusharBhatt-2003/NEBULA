"use client";
import Link from "next/link";
import useUser from "../hooks/useUser";
import { Button } from "../components/ui/button";
import LogoutBtn from "../components/logoutBtn";
import StarField from "../components/starField";
import Skeleton from "../components/profile/skeleton";
import { ProfileImage } from "../components/profile/profileImage";
import { ProfileDetails } from "../components/profile/profileDetails";
import { useEffect, useState } from "react";
import PostCard from "../components/postCard/postCard";

interface Post {
  _id: string;
  createdAt: number;
  // Add other properties of a post if needed
}

export default function UserProfile() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/posts");
        const data: Post[] = await response.json();
        if (response.ok) {
          const sortedPosts = data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setPosts(sortedPosts);
        } else {
          console.error("Error fetching posts.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter posts to only include those that match the current user's ID
  const filteredPosts = posts.filter((post) => post.userId === user?._id);

  return (
    <div className="p-5 lg:w-[25%] lg:fixed overflow-hidden relative w-full flex flex-col items-center">
      <StarField />
      <div className="mb-20 w-full z-20 space-y-5">
        {user ? (
          <>
            <div className="flex justify-end">
              <LogoutBtn />
            </div>

            <ProfileImage
              profileUrl={user.profileUrl}
              username={user.username}
              gender={user.gender}
            />

            <ProfileDetails
              fullName={user?.fullName}
              bio={user?.bio}
              birthDate={user?.birthday}
              city={user.city}
            />

            <Button>
              <Link href="/update-profile">Update Profile</Link>
            </Button>

            <div className="border-t-2 light-text border-[#f2f0e4]">
              <h1 className="font-['spring'] light-text border-b w-fit">
                POSTS:
              </h1>
              <div className="flex flex-col gap-2 py-2">
                {loading ? (
                  <p>Loading...</p>
                ) : filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <PostCard
                      key={post._id}
                      currentUserId={user._id ?? ""}
                      postId={post._id}
                    />
                  ))
                ) : (
                  <p>No posts found for this user.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}
