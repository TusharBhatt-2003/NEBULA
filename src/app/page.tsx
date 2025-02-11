"use client";
import Link from "next/link";
import useUser from "./hooks/useUser";
import Feed from "./components/feed";

export default function Home() {
  const { user, loading } = useUser();
  return (
    <div className="min-h-screen ">
      {!user ? (
        <div className="flex h-screen items-center justify-center">
          <div className="flex items-center justify-center border-4 border-black px-10 py-20  gap-4 bg-cover bg-center bg-[url('https://i.pinimg.com/originals/dd/c2/1f/ddc21f8c278a27abd4be7a0c48f72a26.gif')]">
            <Link href="/login">
              <button className="px-6 py-3 btnBgColor border-2 border-black font-semibold rounded-md">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-6 py-3 border-2 border-[#fe3b01] text-[#fe3b01] font-semibold rounded-md">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <Feed />
      )}
    </div>
  );
}
