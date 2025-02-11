"use client";
import Link from "next/link";
import Loading from "../components/loading";
import useUser from "../hooks/useUser";

export default function UserProfile() {
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-screen py-2">
      <div className="text-4xl flex gap-2">
        <h1>Welcome</h1>
        {user ? (
          <Link
            className="font-mono text-[#B01018] hover:underline"
            href={`/profile/${user._id}`}
          >
            {user.username}
          </Link>
        ) : (
          <Loading />
        )}
      </div>
      <hr />
      {user ? (
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center gap-5">
            <Link
              className="font-mono btnBgColor rounded-md px-3 py-2 text-[#f3f7de]"
              href={user.isAdmin ? "/admin-panel" : `/profile/${user._id}`}
            >
              {user.isAdmin ? "See Admin Panel" : "See Your Profile"}
            </Link>
          </div>
          <Link className="" href="/">
            <svg
              width="68px"
              height="68px"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M104.613 165C62.4895 136.517 97.2059 92.081 125 137.46"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M259 133.798C279.706 100.527 328.781 104.891 298.253 150"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M161.153 159C160.362 154.1 162.845 149.364 164 145"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M194 165C194.409 156.616 194.948 148.211 196 140"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M228 159C228 154.661 228 150.329 228 146"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M153 223C160.473 220.915 168.386 220.023 176 219"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M225 219C232.895 217.426 240.281 217.931 248 219"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M188 256.005C221.5 238.742 217.338 264.602 191.479 260.565"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M201 267C199.054 288.306 181.973 290.175 167 283.734"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M200.041 267C198.864 295.299 223.581 291.006 237 277.407"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M111 243C96.3264 238.228 80.8117 237.965 66 236"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M116 267C99.8675 270.808 83.7433 273.752 68 279"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M293 233C304.501 229.96 315.688 225.62 327 222"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M297 261C308.857 259.497 322.138 260.027 333 260.429"
                  stroke="#000000"
                  stroke-opacity="0.9"
                  stroke-width="16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </Link>
        </div>
      ) : (
        <div className="font-mono btnBgColor rounded-md px-3 py-2 text-transparent  animate-pulse">
          See Your Profile
        </div>
      )}
    </div>
  );
}
