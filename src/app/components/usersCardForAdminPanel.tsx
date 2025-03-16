"use client";
import Link from "next/link";
import Delete from "../../../public/delete";

interface UserProps {
  user: {
    _id: string;
    username: string;
    email: string;
    profileUrl: string;
    isverified: boolean;
    isAdmin: boolean;
    fullName: string;
  };
  onDelete: (userId: string) => void;
  postCount: number;
}

const UsersCardForAdminPanel: React.FC<UserProps> = ({
  user,
  postCount,
  onDelete,
}) => {
  let backgroundColor = "transparent";
  let textColor = "";
  let borderColor = "#f2f0e4";

  if (user.isverified) {
    backgroundColor = "#C6CFBE";
    borderColor = "#43685C";
  }

  if (user.isAdmin) {
    backgroundColor = "#F6F0E4";
    textColor = "#DC842B";
    borderColor = "#DC842B";
  }

  return (
    <div
      className="border z-20 light-text flex justify-between items-center overflow-hidden rounded-xl"
      style={{ backgroundColor, color: textColor, borderColor }}
    >
      <Link
        href={`/admin-panel/${user._id}`}
        className="flex items-center w-full h-full"
      >
        {user.profileUrl ? (
          <img
            className="w-10 m-2 aspect-square h-10 rounded-xl"
            src={user.profileUrl}
            alt={user.username}
          />
        ) : null}
        <div className="px-2 flex flex-col  h-full">
          <p className="font-thin text-sm">@{user.username}</p>
          <p className="font-bold text-sm">{user.fullName}</p>
        </div>
      </Link>
      <p className="text-sm text-base-content/50">Posts: {postCount}</p>
      <button
        onClick={() => onDelete(user._id)}
        className="m-2 bg-white/50 p-1 rounded-xl "
      >
        <Delete />
      </button>
    </div>
  );
};

export default UsersCardForAdminPanel;
