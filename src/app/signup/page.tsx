"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../components/loading";
import NEBULA from "../components/NEBULA";
import { Input } from "../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";

export default function SignUp() {
  const router = useRouter();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
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
      <div className="absolute w-screen h-screen">
        <NEBULA />
      </div>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="z-10 light-text">
        <div className="relative flex backdrop-blur gap-5 py-5 px-10 rounded-xl border border-[#F2F0E4]/30 z-10 flex-col items-center justify-center overflow-hidden">
          {loading ? (
            <Loading />
          ) : (
            <h1 className="text-4xl text-transparent bg-clip-text animate-gradient-para z-50 font-['LogoFont'] font-semibold">
              Sign up
            </h1>
          )}
          <hr />

          <Input
            className="border border-[#F2F0E4]/30"
            id="username"
            type="text"
            required
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />

          <Input
            className="border border-[#F2F0E4]/30"
            id="email"
            type="email"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />

          <Input
            className="border border-[#F2F0E4]/30"
            id="password"
            type="password"
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />

          <Input
            className="border border-[#F2F0E4]/30"
            id="profileUrl"
            type="text"
            value={user.profileUrl}
            onChange={(e) => setUser({ ...user, profileUrl: e.target.value })}
            placeholder="Profile Image Url"
          />

          <RadioGroup
            className="flex justify-center items-center"
            value={user.gender}
            onValueChange={(value) => setUser({ ...user, gender: value })}
          >
            <Label className="text-sm font-semibold">Gender</Label>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>

          {/* City input */}
          <Input
            className="border border-[#F2F0E4]/30"
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

        <p className="py-2 px-4 text-center">
          Already Have an account,
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
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
