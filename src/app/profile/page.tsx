"use client";
import Link from "next/link";
import Loading from "../components/loading";
import useUser from "../hooks/useUser";

export default function UserProfile() {
  const { user } = useUser();

  const handleLinkClick = (url: string) => {
    window.location.href = url; // This will cause a full reload
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-screen py-2">
      <div className="text-4xl flex gap-2">
        <h1>Welcome</h1>
        {user ? (
          <span
            className="font-mono text-[#B01018] hover:underline cursor-pointer"
            onClick={() => handleLinkClick(`/profile/${user._id}`)}
          >
            {user.username}
          </span>
        ) : (
          <Loading />
        )}
      </div>
      <hr />
      {user ? (
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center gap-5">
            <span
              className="font-mono btnBgColor px-3 py-2 text-[#f3f7de] cursor-pointer"
              onClick={() =>
                handleLinkClick(
                  user.isAdmin ? "/admin-panel" : `/profile/${user._id}`,
                )
              }
            >
              {user.isAdmin ? "See Admin Panel" : "See Your Profile"}
            </span>
          </div>
          <span
            className="font-mono btnBgColor px-3 py-2 text-[#f3f7de] cursor-pointer"
            onClick={() => handleLinkClick("/")}
          >
            Home
          </span>
        </div>
      ) : (
        <div className="font-mono btnBgColor rounded-md px-3 py-2 text-transparent animate-pulse">
          See Your Profile
        </div>
      )}
    </div>
  );
}
