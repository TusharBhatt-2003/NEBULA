"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../components/loading";
import NEBULA from "../components/NEBULA";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    const toastId = toast.loading("Logging in...");
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      toast.success("Login successful!", { id: toastId });
      console.log("Login successful", response.data);

      const { isAdmin } = response.data;
      // Redirect based on isAdmin
      if (isAdmin) {
        router.push("/admin-panel"); // Redirect admin
      } else {
        router.push("/profile"); // Redirect normal users
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
        { id: toastId },
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !buttonDisabled) {
      onLogin();
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute w-screen h-screen">
        <NEBULA />
      </div>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="z-10 light-text">
        <div
          className="relative flex backdrop-blur gap-5 py-5 px-10 rounded-xl border border-[#F2F0E4]/30 z-10 flex-col items-center justify-center overflow-hidden"
          onKeyDown={handleKeyDown} // Add keydown listener here
          tabIndex={0} // Make div focusable for onKeyDown to work
        >
          {loading ? (
            <Loading />
          ) : (
            <h1 className="text-4xl text-transparent bg-clip-text animate-gradient-para z-50 font-['LogoFont'] font-semibold">
              Login
            </h1>
          )}
          <hr />

          <Input
            className="border border-[#F2F0E4]/30"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />

          <Input
            className="border border-[#F2F0E4]/30"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />

          {buttonDisabled ? (
            ""
          ) : (
            <Button
              onClick={onLogin}
              className="py-2 px-4 border light-bg text-black"
            >
              Login
            </Button>
          )}
        </div>

        <p className="py-2 px-4 text-center">
          Create an account,
          <Link
            href="/signup"
            className={`inline-block mx-1 cursor-pointer underline ${
              hoveredLink === "Sign Up"
                ? "text-transparent bg-clip-text animate-gradient-para"
                : "light-text"
            }`}
            onMouseEnter={() => setHoveredLink("Sign Up")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
