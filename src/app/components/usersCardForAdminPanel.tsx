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
  };
  onDelete: (userId: string) => void;
}

const UsersCardForAdminPanel: React.FC<UserProps> = ({ user, onDelete }) => {
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
      className="border z-20  light-text flex justify-between items-center overflow-hidden rounded-xl"
      style={{ backgroundColor, color: textColor, borderColor }}
    >
      <Link href={`/admin-panel/${user._id}`} className="flex w-full h-full">
        <img src={user.profileUrl} className="w-20 h-20 m-2 rounded-xl" />
        <div className="px-2 flex flex-col justify-center items-center h-full">
          <p className="capitalize font-bold text-lg">{user.username}</p>
        </div>
      </Link>
      <button onClick={() => onDelete(user._id)} className="m-2">
        <Delete />
      </button>
    </div>
  );
};

export default UsersCardForAdminPanel;
