"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../components/loading";

export default function LoginPage() {
  const router = useRouter();

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

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen py-2">
      <Toaster position="top-right" reverseOrder={false} />

      {loading ? (
        <Loading />
      ) : (
        <h1 className="text-4xl text-[#B01018] font-semibold">Login</h1>
      )}
      <hr />

      <input
        className="p-1 rounded-md bg-black border-2 border-black inputBg placeholderColor outline-none"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <input
        className="p-1 rounded-md bg-black border-2 border-black inputBg placeholderColor outline-none"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      {buttonDisabled ? (
        ""
      ) : (
        <button
          onClick={onLogin}
          className="py-2 px-4 rounded-lg btnBgColor border-2 border-black"
        >
          Login
        </button>
      )}

      <Link href="/signup">
        <p className="py-2 px-4 rounded-lg hover:underline">
          Create an account, Sign up
        </p>
      </Link>
    </div>
  );
}
