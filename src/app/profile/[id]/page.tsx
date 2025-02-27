"use client";
import Link from "next/link";
import Female from "../../../../public/female";
import Male from "../../../../public/male";
import Loading from "../../components/loading";
import useUser from "../../hooks/useUser";
import { Button } from "../../components/ui/button";
import LogoutBtn from "../../components/logoutBtn";
import StarField from "../../components/starField";
import { use, useEffect, useState } from "react";
import Skeleton from "@/app/components/profile/skeleton";

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
              <div className="flex justify-end">
                <LogoutBtn />
              </div>
              <div className="relative ">
                <img
                  className="w-full aspect-square h-full rounded-xl object-cover"
                  src={user.profileUrl}
                  alt="Profile Pic"
                />
                <div className="absolute left-2 bottom-2 flex items-center justify-center">
                  <span className="font-['spring'] light-text text-xl font-bold">
                    {user.username}
                  </span>
                </div>
                <div className="absolute right-2 top-2 flex items-center justify-center">
                  {user.gender === "Male" ? (
                    <Male />
                  ) : user.gender === "Female" ? (
                    <Female />
                  ) : null}
                </div>
              </div>

              <div className="relative py-2 px-3 flex flex-col gap-2 z-10 backdrop-blur rounded-xl border border-[#F2F0E4]/30 overflow-hidden light-text">
                <div className="grain"></div>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-['spring'] rounded-t-xl">
                    Full Name
                  </h1>
                  <p className="p-1 rounded-xl border border-[#F2F0E4]/30">
                    connection
                  </p>
                </div>
                <p className="">
                  This is the bio of the user, They can write any thing here.
                </p>

                <div className="flex justify-between items-center">
                  <p className="font-['Big']">1 9 / 0 3 / 0 3</p>
                  <p className="bg-black font-['spring'] px-1">{user.city}</p>
                </div>
              </div>
              <div className="border-t-2 border-[#f2f0e4]">
                <h1 className="font-['spring'] light-text border-b w-fit">
                  POSTS:
                </h1>
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
