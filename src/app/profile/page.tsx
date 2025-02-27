"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { Button } from "../components/ui/button";
import LogoutBtn from "../components/logoutBtn";
import StarField from "../components/starField";
import Skeleton from "../components/profile/skeleton";
import { ProfileImage } from "../components/profile/profileImage";
import { ProfileDetails } from "../components/profile/profileDetails";
import { Post } from "../components/profile/posts";

export default function UserProfile() {
  const { user } = useUser();
  const [colors, setColors] = useState<string[]>([]);

  return (
    <div className="h-screen p-5 overflow-hidden relative w-full flex flex-col items-center">
      <StarField />
      <div className="w-full z-20 space-y-5">
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
              fullName="Full Name"
              bio="This is the bio of the user. They can write anything here."
              birthDate="1 9 / 0 3 / 0 3"
              city={user.city}
            />

            <Button>
              <Link href="/update-profile">Update Profile</Link>
            </Button>

            <Post posts={user?.posts || []} />

            {/* Display Extracted Color Palette */}
            {colors.length > 0 && (
              <div className="flex gap-2 mt-4">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  ></div>
                ))}
              </div>
            )}
          </>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}
