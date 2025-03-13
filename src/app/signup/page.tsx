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
import { Button } from "../components/ui/button";
import { DatePickerDemo } from "../components/ui/datePicker";

export default function SignUp() {
  const router = useRouter();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    // profileUrl: "",
    gender: "",
    bio: "",
    city: "",
    fullName: "",
    birthday: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    const toastId = toast.loading("Signing up...");
    try {
      setLoading(true);

      // Convert birthday to ISO 8601 format (YYYY-MM-DD)
      const formattedDate = new Date(user.birthday).toISOString().split("T")[0];

      const response = await axios.post("/api/users/signup", {
        ...user,
        birthday: formattedDate, // Use the correctly formatted date
      });

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

      <div className="z-10">
        <form
          className="relative flex backdrop-blur gap-5 py-5 px-10 rounded-xl border border-[#F2F0E4]/30 z-10 flex-col items-center justify-center overflow-hidden"
          onSubmit={onSignup}
        >
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
            id="fullName"
            type="text"
            required
            value={user.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            placeholder="Full Name"
          />
          <DatePickerDemo
            id="birthday"
            type="date"
            required
            value={user.birthday}
            onChange={(e) => setUser({ ...user, birthday: e.target.value })}
            placeholder="Birthday"
          />
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

          {/* <Input
            className="border border-[#F2F0E4]/30"
            id="profileUrl"
            type="text"
            value={user.profileUrl}
            onChange={(e) => setUser({ ...user, profileUrl: e.target.value })}
            placeholder="Profile Image Url"
          /> */}

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

          {/* <Input
            className="border border-[#F2F0E4]/30"
            id="city"
            type="text"
            value={user.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
            placeholder="City"
          /> */}

          {!buttonDisabled && (
            <Button
              onClick={onSignup}
              className="py-2 px-4 border light-bg text-black"
            >
              Sign Up
            </Button>
          )}
        </form>

        <p className="py-2 px-4 text-center">
          Already Have an account,
          <Link
            href="/login"
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
