"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import StarField from "../components/starField";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface FormData {
  userId?: string;
  fullName?: string;
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
    fullName: "",
    username: "",
    email: "",
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
    <div className="relative h-screen flex flex-col justify-start items-center overflow-hidden max-w-md mx-auto p-10">
      <StarField />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col z-20 h-full items-center gap-5"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-center text-transparent bg-clip-text animate-gradient-para z-50 font-['LogoFont'] font-semibold">
            Update Profile
          </h1>
          <Button type="submit">Update Profile</Button>
        </div>
        <div className="relative flex overflow-y-scroll backdrop-blur h-[40%] gap-5 py-5 px-10 rounded-xl border border-[#F2F0E4]/30 z-10 flex-col">
          {Object.keys(formData).map((key) =>
            key !== "userId" ? (
              <div key={key}>
                <label className="text-lg light-text">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </label>
                <Input
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className={`light-text focus:border-2 ${
                    user && user[key as keyof typeof user]
                      ? "border-green-500"
                      : "border-red-500"
                  }`}
                />
              </div>
            ) : null,
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
