"use client";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import StarField from "../../components/starField";
import { use, useEffect, useState } from "react";
import Skeleton from "@/app/components/profile/skeleton";
import { ProfileImage } from "@/app/components/profile/profileImage";
import { ProfileDetails } from "@/app/components/profile/profileDetails";
import { Post } from "@/app/components/profile/posts";

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

      <div className="h-screen p-5 overflow-hidden relative w-full flex flex-col items-center">
        <StarField />
        <div className="w-full z-20 space-y-5">
          {user ? (
            <>
              <ProfileImage
                profileUrl={user.profileUrl}
                username={user.username}
                gender={user.gender}
              />

              <ProfileDetails
                fullName={user.fullName}
                bio={user.bio}
                birthDate={user.birthday}
                city={user.city}
              />
              <Button>
                <Link href="/update-profile">Update Profile</Link>
              </Button>
              <Post />
            </>
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </>
  );
}
