"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import StarField from "../components/starField";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface FormData {
  userId?: string;
  username?: string;
  email?: string;
  password?: string;
  profileUrl?: string;
  gender?: string;
  bio?: string;
  city?: string;
  [key: string]: string | undefined;
}

const UpdateProfilePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    profileUrl: "",
    gender: "",
    bio: "",
    city: "",
  });

  useEffect(() => {
    if (user?._id) {
      setFormData((prev) => ({ ...prev, userId: user._id }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Profile updated successfully!");
        router.push("/profile");
      } else {
        alert(data.error || "Failed to update profile");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="relative  h-screen flex flex-col justify-start items-center overflow-hidden max-w-md mx-auto p-10">
      <StarField />
      <div className="z-20 space-y-5">
        <h1 className="text-4xl text-transparent bg-clip-text animate-gradient-para z-50 font-['LogoFont'] font-semibold">
          Update Profile
        </h1>
        <form
          onSubmit={handleSubmit}
          className="relative flex backdrop-blur gap-5 py-5 px-10 rounded-xl border border-[#F2F0E4]/30 z-10 flex-col items-center justify-center overflow-hidden"
        >
          <div className="grain"></div>
          {Object.keys(formData).map((key) =>
            key !== "userId" ? (
              <Input
                key={key}
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full p-2 border rounded light-text focus:border-2"
              />
            ) : null,
          )}
          <Button type="submit">Update Profile</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
