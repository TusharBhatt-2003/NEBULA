"use client";
import Loading from "../components/loading";
import useUser from "../hooks/useUser";
import NEBULA from "../components/NEBULA";
import { Button } from "../components/ui/button";

export default function welcome() {
  const { user } = useUser();

  const handleLinkClick = (url: string) => {
    window.location.href = url; // This will cause a full reload
  };

  return (
    <div className="flex light-text font-['spring'] flex-col items-center justify-center gap-2 h-screen py-2">
      <div className="absolute  w-screen h-screen">
        <NEBULA />
      </div>
      <div className="text-4xl z-10 w-full justify-center items-baseline flex gap-2">
        <h1>Welcome</h1>
        {user ? (
          <p
            className="font-['logo'] font-semibold text-transparent bg-clip-text animate-gradient-para cursor-pointer"
            onClick={() => handleLinkClick(`/profile/${user._id}`)}
          >
            {user.username}
          </p>
        ) : (
          <Loading />
        )}
      </div>
      <div className="relative z-10  backdrop-blur gap-5 py-10 rounded-xl border border-[#F2F0E4]/30 w-[90%] md:w-[40%] lg:w-[30%] text-center space-y-2 overflow-hidden light-text">
        <div className="grain"></div>
        {user ? (
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <div className="flex  items-center justify-center gap-5">
              <Button
                variant="default"
                onClick={() =>
                  handleLinkClick(user.isAdmin ? "/admin-panel" : `/profile`)
                }
              >
                {user.isAdmin ? "See Admin Panel" : "See Your Profile"}
              </Button>
            </div>
            <Button variant="outline" onClick={() => handleLinkClick("/feed")}>
              Home
            </Button>
          </div>
        ) : (
          <Button variant="ghost" className="text-transparent">
            See Your Profile
          </Button>
        )}
      </div>
    </div>
  );
}
