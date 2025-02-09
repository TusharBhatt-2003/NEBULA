"use client";
import Link from "next/link";
import useUser from "./hooks/useUser";
import Cat from "./components/cat";
import AdBanner from "./components/adbanner";

export default function Home() {
  const { user, loading } = useUser();
  return (
    <div className="flex h-screen items-center justify-center">
      {!user ? (
        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-6 py-3 btnBgColor  border-2 border-black font-semibold rounded-md">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-6 py-3 border-2 border-[#fe3b01] text-[#fe3b01] font-semibold rounded-md">
              Sign Up
            </button>
          </Link>
          <AdBanner />
        </div>
      ) : (
        <Cat />
      )}
    </div>
  );
}
