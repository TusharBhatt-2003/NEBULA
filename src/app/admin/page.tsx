import User from "@/models/userModel";
import Link from "next/link";
import React from "react";

export default async function page() {
  // Fetch all users
  const users = await User.find(); // Get only the name field

  return (
    <div>
      <div className="text-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 overflow-hidden">
        <h2 className="text-2xl">All User Names:</h2>
        {users.length > 0 ? (
          users.map((user) => {
            // Set background, text, and border color based on user properties
            let backgroundColor = "transparent";
            let textColor = "";
            let borderColor = "black";

            if (user.isverified) {
              backgroundColor = "#C6CFBE";
              textColor = "#43685C";
              borderColor = "#43685C";
            }

            if (user.isAdmin) {
              backgroundColor = "#F6F0E4";
              textColor = "#DC842B";
              borderColor = "#DC842B";
            }

            return (
              <Link
                href={`/admin/${user._id}`}
                key={user._id}
                className="border-2 border-black rounded-md flex items-center overflow-hidden"
                style={{
                  backgroundColor,
                  color: textColor,
                  borderColor,
                }}
              >
                <img src={user.profileUrl} className="w-20" />
                <div className="px-2 flex flex-col justify-evenly h-full">
                  <p className="capitalize font-mono text-lg">
                    {user.username}
                  </p>
                  <p className="capitalize font-mono text-sm">{user.email}</p>

                  {/* Conditionally render a message for admin users */}
                  {user.isAdmin && (
                    <p className="text-sm mt-2 font-semibold">Admin</p>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-[#fe3b01]">No users found.</p>
        )}
      </div>
    </div>
  );
}
