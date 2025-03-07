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
import Bio from "../components/profile/bio";

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
    <div className="p-5 lg:w-[25%] lg:fixed overflow-hidden relative w-full ">
      <div className="fixed">
        <StarField />
      </div>
      <div className="mb-20 w-full z-20 space-y-5">
        {user ? (
          <>
            <div className="flex gap-2">
              <div className="w-1/3">
                <ProfileImage profileUrl={user.profileUrl} />
              </div>

              <div className="w-2/3">
                <ProfileDetails
                  fullName={user.fullName}
                  username={user.username}
                  birthDate={user.birthday}
                  city={user.city}
                  gender={user.gender}
                />
              </div>
            </div>

            {user.bio ? <Bio bio={user.bio} /> : null}

            <div className="flex justify-between">
              <LogoutBtn />
              <Button>
                <Link href="/update-profile">Update Profile</Link>
              </Button>
            </div>

            <div className="border-t-2 light-text border-[#f2f0e4]">
              <h1 className="font-['spring'] light-text border-b w-fit">
                POSTS:
              </h1>
              <div className="flex overflow-auto flex-col gap-2 py-2">
                {loading ? null : filteredPosts.length > 0 ? (
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
