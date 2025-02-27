"use client";
import Female from "../../../public/female";
import Male from "../../../public/male";
import Loading from "../components/loading";
import useUser from "../hooks/useUser";

export default function UserProfile() {
  const { user } = useUser();

  return (
    <div className="py-10 flex flex-col justify-center items-center">
      <div>
        {user ? (
          <div className="relative ">
            <img
              className="w-full h-full rounded-xl object-cover"
              src={user.profileUrl}
              alt="Profile Pic"
            />
            <div className="absolute left-2 bottom-2 flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {user.username}
              </span>
            </div>
            <div className="absolute right-2 top-2 flex items-center justify-center">
              {user.gender === "Male" ? (
                <Male />
              ) : user.gender === "Female" ? (
                <Female />
              ) : null}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
