"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../components/loading";

export default function SignUp() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    profileUrl: "",
    gender: "",
    bio: "",
    city: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    const toastId = toast.loading("Signing up...");
    try {
      setLoading(true);

      // Check if profileUrl is empty and assign the default value
      if (!user.profileUrl) {
        user.profileUrl =
          "https://i.pinimg.com/736x/1a/bb/12/1abb12125ce51b432f17fda64def85e5.jpg"; // Default URL
      }

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

      <div className="flex flex-col items-center justify-center gap-2 border-2 border-black p-5">
        {loading ? (
          <Loading />
        ) : (
          <h1 className="text-4xl text-[#B01018] font-semibold">Sign up</h1>
        )}
        <hr />

        <input
          className="p-1 bg-black border-2 border-black inputBg placeholderColor outline-none"
          id="username"
          type="text"
          required
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />

        <input
          className="p-1 bg-black border-2 border-black inputBg placeholderColor outline-none"
          id="email"
          type="email"
          required
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />

        <input
          className="p-1 bg-black border-2 border-black inputBg placeholderColor outline-none"
          id="password"
          type="password"
          required
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />

        <input
          className="p-1 bg-black border-2 border-black inputBg placeholderColor"
          id="profileUrl"
          type="text"
          value={user.profileUrl}
          onChange={(e) => setUser({ ...user, profileUrl: e.target.value })}
          placeholder="Profile Image Url"
        />

        {/* Gender input */}
        <select
          className="p-1 bg-black border-2 border-black inputBg placeholderColor"
          id="gender"
          value={user.gender}
          onChange={(e) => setUser({ ...user, gender: e.target.value })}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Bio input */}
        <textarea
          className="p-1 bg-black border-2 border-black inputBg placeholderColor"
          id="bio"
          value={user.bio}
          onChange={(e) => setUser({ ...user, bio: e.target.value })}
          placeholder="Write a short bio"
        />

        {/* City input */}
        <input
          className="p-1 bg-black border-2 border-black inputBg placeholderColor"
          id="city"
          type="text"
          value={user.city}
          onChange={(e) => setUser({ ...user, city: e.target.value })}
          placeholder="City"
        />

        {buttonDisabled ? (
          ""
        ) : (
          <button
            onClick={onSignup}
            className="py-2 px-4 btnBgColor border-2 border-black"
          >
            Signup
          </button>
        )}
      </div>

      <Link href="/login">
        <p className="py-2 px-4 rounded-lg hover:underline">
          Already have an account? Login
        </p>
      </Link>
    </div>
  );
}
