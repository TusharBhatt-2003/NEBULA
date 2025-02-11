"use client";

import ProfileSkeleton from "@/app/components/profileSkeleton";
import React, { use, useEffect, useState } from "react";

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

      <div className="h-screen flex justify-center items-center p-2">
        {loading ? (
          <ProfileSkeleton />
        ) : user ? (
          <div>
            <div className="shadow-xl border-4 border-black">
              <img
                src={user.profileUrl}
                className="w-64 m-3 border-2 border-black"
                alt={user.username}
              />
              <div className="m-3">
                <p className="uppercase text-[#B01018] text-xl font-black">
                  {user.username}
                </p>
                <p>{user.email}</p>
                <p>{user.gender}</p>
                <p>{user.bio}</p>
                <p>{user.city}</p>
              </div>
              <div className="flex items-center gap-3 m-3">
                {user.isverified ? (
                  <div className=" py-1 px-2 text-[#f3f7de] rounded bg-emerald-600">
                    <p>Verified</p>
                  </div>
                ) : (
                  <div className=" py-1 px-2 rounded bg-green-100">
                    <p>Not Verified</p>
                  </div>
                )}
                <p>
                  {user.isAdmin ? (
                    <div className=" py-1 px-2 rounded text-yellow-600 bg-yellow-100">
                      <p>Admin</p>
                    </div>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>No user found.</p>
        )}
      </div>
    </>
  );
}
