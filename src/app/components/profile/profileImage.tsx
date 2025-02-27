"use client";
import Female from "../../../../public/female";
import Male from "../../../../public/male";

// Image Component
interface ProfileImageProps {
  profileUrl: string;
  username: string;
  gender: string;
}

export const ProfileImage = ({
  profileUrl,
  username,
  gender,
}: ProfileImageProps) => {
  return (
    <div className="relative">
      <img
        className="w-full aspect-square h-full rounded-xl object-cover"
        src={profileUrl}
        alt="Profile Pic"
      />
      <div className="absolute left-2 bottom-2 flex items-center justify-center">
        <span className="font-['spring'] light-text text-xl font-bold">
          {username}
        </span>
      </div>
      <div className="absolute right-2 top-2 flex items-center justify-center">
        {gender === "Male" ? <Male /> : gender === "Female" ? <Female /> : null}
      </div>
    </div>
  );
};
