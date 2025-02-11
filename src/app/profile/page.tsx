"use client";
import Link from "next/link";
import Loading from "../components/loading";
import useUser from "../hooks/useUser";

export default function UserProfile() {
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-screen py-2">
      <div className="text-4xl flex gap-2">
        <h1>Welcome</h1>
        {user ? (
          <Link
            className="font-mono text-[#B01018] hover:underline"
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
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center gap-5">
            <Link
              className="font-mono btnBgColor px-3 py-2 text-[#f3f7de]"
              href={user.isAdmin ? "/admin-panel" : `/profile/${user._id}`}
            >
              {user.isAdmin ? "See Admin Panel" : "See Your Profile"}
            </Link>
          </div>
          <Link
            className="font-mono btnBgColor px-3 py-2 text-[#f3f7de]"
            href="/"
          >
            Home
          </Link>
        </div>
      ) : (
        <div className="font-mono btnBgColor rounded-md px-3 py-2 text-transparent  animate-pulse">
          See Your Profile
        </div>
      )}
    </div>
  );
}
