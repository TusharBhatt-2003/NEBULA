"use client";
import { useEffect, useState } from "react";
import { use } from "react"; // Import use from React to unwrap promises

interface Params {
  id: string;
}

export default function Page({ params }: { params: Promise<Params> }) {
  const [users, setUsers] = useState<any[]>([]);

  // Unwrap the params using React.use() and ensure the type is correct
  const { id } = use(params);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          console.error(data.message || "Error fetching users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter the users array to only include the user with the matching _id
  const user = users.find((user) => user._id === id);

  return (
    <div className="h-screen flex justify-center items-center p-2">
      {user ? (
        <div className="shadow-xl rounded-2xl border-2 border-black">
          <img
            src={user.profileUrl}
            className="w-64 rounded-lg m-3 border-2 border-black"
          />
          <div className="m-3">
            <p className="uppercase text-[#fe3b01] text-xl font-black">
              {user.username}
            </p>
            <p>{user.email}</p>
          </div>
          <div className="flex items-center gap-3 m-3">
            {user.isverified ? (
              <div className=" py-1 px-2 text-[#f3f7de] rounded bg-emerald-600">
                <p>Verified</p>
              </div>
            ) : (
              <div className=" py-1 px-2 rounded bg-green-100">
                <p>Not Verified</p>
              </div>
            )}
            <p>
              {user.isAdmin ? (
                <div className=" py-1 px-2 rounded text-yellow-600 bg-yellow-100">
                  <p>Admin</p>
                </div>
              ) : null}
            </p>
          </div>
        </div>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
}
