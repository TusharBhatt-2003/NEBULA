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
import ConfirmationModal from "../components/confirmationModal";
import { useRouter } from "next/navigation";

interface Post {
  _id: string;
  createdAt: number;
  likes: { _id: string }[];
  // Add other properties of a post if needed
}

export default function UserProfile() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const requiredFields = [
    "fullName",
    "profileUrl",
    "email",
    "bio",
    "username",
    "gender",
    "city",
    "birthday",
  ];

  const isProfileIncomplete =
    user &&
    requiredFields.some((field) => {
      const value = user[field as keyof typeof user];
      return typeof value === "string" ? !value.trim() : !value;
    });

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
    <div className="p-5 lg:w-[20%] lg:fixed overflow-hidden relative w-full ">
      <div className="fixed">
        <StarField />
      </div>
      <div className="mb-20 w-full z-20 space-y-5">
        {user ? (
          <>
            <div className="flex gap-2">
              <div className="w-1/3 z-[99]">
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
            <div className="gap-2 flex flex-wrap items-center">
              <h1 className="font-['spring'] light-text w-fit">
                Following Tags :
              </h1>
              {user.followingTags.map((tag, index) => (
                <Link key={index} href={`/tag/${tag}`}>
                  <p className="light-bg w-fit text-black font-bold px-2 pb-1 rounded-xl text-sm opacity-70">
                    {tag}
                  </p>
                </Link>
              ))}
            </div>

            <div className="flex justify-between">
              <LogoutBtn />
              <Button>
                <Link href="/update-profile">Update Profile</Link>
              </Button>
            </div>

            <div className="border-t-2 light-text border-[#f2f0e4]">
              <h1 className="font-['spring'] light-text w-fit">POSTS:</h1>
              <div className="columns-2 space-y-5 overflow-auto flex-col gap-2 py-2">
                {loading ? null : filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <PostCard
                      key={post._id}
                      image={post.image}
                      text={post.text}
                      tags={post.tags}
                      currentUserId={user._id}
                      postId={post._id}
                      authorId={post.userId}
                      username={post.author?.username || "Unknown User"}
                      profileUrl={
                        post.author?.profileUrl || "/default-profile.png"
                      }
                      likes={post.likes}
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

        <>
          {isProfileIncomplete && (
            <ConfirmationModal
              sentence="Your profile is incomplete. Please update your information."
              onConfirm={() => router.push("/update-profile")}
              onCancel={() => setModalOpen(false)}
            />
          )}
        </>
      </div>
    </div>
  );
}
