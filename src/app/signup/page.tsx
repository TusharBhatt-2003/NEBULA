"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    const toastId = toast.loading("Signing up...");
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      toast.success("Signup successful!", { id: toastId });
      console.log("Signup successful", response.data);

      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again.",
        { id: toastId },
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.username && user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen py-2">
      <Toaster position="top-right" reverseOrder={false} />

      <h1>{loading ? "..." : "Signup"}</h1>
      <hr />

      <input
        className="p-1 rounded-md bg-black border-2 border-black inputBg placeholderColor"
        id="username"
        type="text"
        required
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />

      <input
        className="p-1 rounded-md bg-black border-2 border-black inputBg placeholderColor"
        id="email"
        type="email"
        required
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <input
        className="p-1 rounded-md bg-black border-2 border-black inputBg placeholderColor"
        id="password"
        type="password"
        required
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      {buttonDisabled ? (
        ""
      ) : (
        <button
          onClick={onSignup}
          className="py-2 px-4 rounded-lg btnBgColor border-2 border-black"
        >
          Signup
        </button>
      )}

      <Link href="/login">
        <p className="py-2 px-4 rounded-lg hover:underline">
          Already have an account? Login
        </p>
      </Link>
    </div>
  );
}
