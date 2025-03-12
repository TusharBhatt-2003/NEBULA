"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import StarField from "../components/starField";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import ProfilePictureUpdate from "../components/imagekit/profilePictureUpdate";
import PopupAlert from "../components/PopupAlert";

interface FormData {
  userId?: string;
  fullName?: string;
  username?: string;
  email?: string;
  profileUrl?: string;
  gender?: string;
  bio?: string;
  city?: string;
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

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setAlertMessage("Profile updated successfully!");
        setTimeout(() => router.push("/profile"), 2000);
      } else {
        setAlertMessage(data.error || "Failed to update profile");
      }
    } catch (error) {
      setAlertMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="relative h-screen flex flex-col justify-start items-center overflow-hidden max-w-md mx-auto p-10">
      {alertMessage && <PopupAlert alertMessage={alertMessage} />}

      <StarField />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col z-20 h-full items-center gap-5"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-center text-transparent bg-clip-text animate-gradient-para z-50 font-semibold">
            Update Profile
          </h1>
          <Button type="submit">Update Profile</Button>
        </div>

        <div className="relative flex overflow-y-scroll backdrop-blur h-[40%] gap-5 py-5 px-10 rounded-xl border border-[#F2F0E4]/30 z-10 flex-col">
          <div className="flex flex-col gap-1">
            <label>Update Profile Picture:</label>
            <ProfilePictureUpdate
              onUploadSuccess={(url) =>
                setFormData((prev) => ({ ...prev, profileUrl: url }))
              }
            />
          </div>

          {(Object.keys(formData) as Array<keyof FormData>).map(
            (key) =>
              key !== "userId" && (
                <div key={key}>
                  <label className="text-lg">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </label>
                  <Input
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    className={`focus:border-2 ${
                      user && user[key as keyof typeof user]
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                  />
                </div>
              ),
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
