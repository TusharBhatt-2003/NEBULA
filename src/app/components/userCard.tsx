"use client";
import Link from "next/link";

interface UserProps {
  user: {
    _id: string;
    username: string;
    email: string;
    profileUrl: string;
    isverified: boolean;
    isAdmin: boolean;
  };
}

const UsersCard: React.FC<UserProps> = ({ user }) => {
  let backgroundColor = "transparent";
  let textColor = "light-text";
  let borderColor = "black";

  if (user.isverified) {
    backgroundColor = "#C6CFBE";
    textColor = "#43685C";
    borderColor = "#43685C";
  }

  return (
    <div
      className="z-20 flex light-text justify-between items-center overflow-hidden"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="relative rounded-xl overflow-hidden backdrop-blur-[5px] flex justify-between w-full h-full">
        <div className="grain"></div>
        <div className="flex">
          <img src={user.profileUrl} className="w-20 h-20 p-2 rounded-3xl" />
          <div className="px-2 flex flex-col justify-center items-center h-full">
            <p className="capitalize font-bold text-lg">{user.username}</p>
          </div>
        </div>
        <Link
          className="animate-gradient-bg flex flex-col justify-center items-center h-full"
          href={`/profile/${user._id}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default UsersCard;
