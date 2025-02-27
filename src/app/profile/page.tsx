"use client";
import Link from "next/link";
import Female from "../../../public/female";
import Male from "../../../public/male";
import Loading from "../components/loading";
import useUser from "../hooks/useUser";
import { Button } from "../components/ui/button";
import LogoutBtn from "../components/logoutBtn";
import StarField from "../components/starField";

export default function UserProfile() {
  const { user } = useUser();

  return (
    <div className="h-screen overflow-hidden relative w-full flex flex-col justify-center items-center">
      <StarField />
      <div className="w-full px-5 space-y-10">
        {user ? (
          <>
            <div className="relative ">
              <img
                className="w-full aspect-square h-full rounded-xl object-cover"
                src={user.profileUrl}
                alt="Profile Pic"
              />
              <div className="absolute left-2 bottom-2 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
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
                <h1 className="text-2xl  rounded-t-xl">Full Name</h1>
                <p className="p-1 rounded-xl border border-[#F2F0E4]/30">
                  connection
                </p>
              </div>
              <p className="">
                This is the bio of the user, They can write any thing here.
              </p>

              <div className="flex justify-between items-center">
                <p>DD/MM/YY</p>
                <p className="bg-black text-white px-1">{user.city}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Link href="/update-profile">
                <Button>Update Profile</Button>
              </Link>
              <LogoutBtn />
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
