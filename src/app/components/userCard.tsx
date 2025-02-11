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
  let textColor = "";
  let borderColor = "black";

  if (user.isverified) {
    backgroundColor = "#C6CFBE";
    textColor = "#43685C";
    borderColor = "#43685C";
  }

  return (
    <div
      className="border-2 border-black  flex justify-between items-center overflow-hidden"
      style={{ backgroundColor, color: textColor, borderColor }}
    >
      <div className="flex justify-between w-full h-full">
        <div className="flex">
          <img
            src={user.profileUrl}
            className="w-20 h-20 p-2 border-r-2 border-black"
          />
          <div className="px-2 flex flex-col justify-center items-center h-full">
            <p className="capitalize font-bold text-lg">{user.username}</p>
          </div>
        </div>
        <Link
          className="px-2 flex flex-col justify-center items-center h-full border-l-2 border-black"
          href={`/profile/${user._id}`}
        >
          profile
        </Link>
      </div>
    </div>
  );
};

export default UsersCard;
