"use client";

// Image Component
interface ProfileImageProps {
  profileUrl: string;
}

export const ProfileImage = ({ profileUrl }: ProfileImageProps) => {
  return (
    <img
      className="w-full  aspect-square h-full rounded-xl object-cover"
      src={profileUrl}
      alt="Profile Pic"
    />
  );
};
