import Female from "../../../../public/female";
import Male from "../../../../public/male";

interface ProfileDetailsProps {
  fullName: string;
  username: string;
  birthDate: string;
  city: string;
  gender: string;
}

export const ProfileDetails = ({
  fullName,
  username,
  birthDate,
  city,
  gender,
}: ProfileDetailsProps) => {
  // Format the birthday date to dd/mm/yy format
  const formattedDate = new Date(birthDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div className="relative w-full h-full py-2 px-3 flex flex-col gap-2 z-10 backdrop-blur rounded-3xl border border-[#F2F0E4]/30 overflow-hidden light-text">
      <div className="grain"></div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-lg leading-snug font-['spring'] rounded-t-xl">
            {fullName}
          </h1>
          {gender === "Male" ? (
            <Male />
          ) : gender === "Female" ? (
            <Female />
          ) : null}

          {/* <p className="p-1 rounded-xl border border-[#F2F0E4]/30">
            connection
          </p> */}
        </div>
        <div className="h-full">
          <p className="source-code">@{username}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-['Big'] text-sm">{formattedDate}</p>
          <p className="bg-black text-sm font-['spring'] px-1">{city}</p>
        </div>
      </div>
    </div>
  );
};
