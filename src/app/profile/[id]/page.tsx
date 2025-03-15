"use client";

import StarField from "../../components/starField";
import { use, useEffect, useState } from "react";
import Skeleton from "@/app/components/profile/skeleton";
import { ProfileImage } from "@/app/components/profile/profileImage";
import { ProfileDetails } from "@/app/components/profile/profileDetails";

import PostCard from "@/app/components/postCard/postCard";
import Bio from "@/app/components/profile/bio";

interface Post {
  _id: string;
  createdAt: number;
  likes: { _id: string }[];
  // Add other properties of a post if needed
}
interface Params {
  id: string;
}

export default function Page({ params }: { params: Promise<Params> }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Unwrap the params using React.use() and ensure the type is correct
  const { id } = use(params);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          console.error(data.message || "Error fetching users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter the users array to only include the user with the matching _id
  const user = users.find((user) => user._id === id);

  // Dynamic meta data for SEO
  const seoData = {
    title: user ? `${user.username}'s Profile` : "User Profile",
    description: user
      ? `View the profile of ${user.username}. ${user.isverified ? "Verified User" : "Unverified User"}.`
      : "No user found",
    image: user ? user.profileUrl : "/default-profile.png", // Fallback to a default image if no user is found
  };
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
  const filteredPosts = posts.filter((post) => post.userId === id);

  return (
    <>
      {/* SEO meta tags */}
      <head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.image} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={window.location.href} />
        {/* Twitter meta tags */}
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.image} />
      </head>

      <div className="overflow-hidden relative w-full p-5">
        <div className="fixed">
          <StarField />
        </div>
        <div className="container mx-auto mb-20 w-full z-20 space-y-5">
          {user ? (
            <>
              <div className="flex gap-2 ">
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

              <div className="border-t-2 light-text border-[#f2f0e4]">
                <h1 className="font-['spring'] light-text border-b w-fit">
                  POSTS:
                </h1>
                <div className="columns-2 space-y-3 py-2">
                  {loading ? null : filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
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
        </div>
      </div>
    </>
  );
}
