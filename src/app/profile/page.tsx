"use client";
import Link from "next/link";
import Loading from "../components/loading";
import useUser from "../hooks/useUser";

export default function UserProfile() {
  const { user, loading } = useUser();
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen py-2">
      <div className="text-4xl flex gap-2">
        <h1>Welcome</h1>
        {user ? (
          <Link
            className="font-mono text-[#fe3b01] hover:underline"
            href={`/profile/${user._id}`}
          >
            {user.username}
          </Link>
        ) : (
          <Loading />
        )}
      </div>
      <hr />
      {user ? (
        <Link
          className="font-mono btnBgColor rounded-md px-3 py-2 text-[#f3f7de]"
          href={`/profile/${user._id}`}
        >
          See Your Profile
        </Link>
      ) : (
        <div className="font-mono btnBgColor rounded-md px-3 py-2 text-transparent  animate-pulse">
          See Your Profile
        </div>
      )}
    </div>
  );
}
