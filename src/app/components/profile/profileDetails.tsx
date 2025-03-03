interface ProfileDetailsProps {
  fullName: string;
  bio: string;
  birthDate: string;
  city: string;
}

export const ProfileDetails = ({
  fullName,
  bio,
  birthDate,
  city,
}: ProfileDetailsProps) => {
  // Format the birthday date to dd/mm/yy format
  const formattedDate = new Date(birthDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div className="relative w-full h-full py-2 px-3 flex flex-col gap-2 z-10 backdrop-blur rounded-xl border border-[#F2F0E4]/30 overflow-hidden light-text">
      <div className="grain"></div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-lg leading-snug font-['spring'] rounded-t-xl">
            {fullName}
          </h1>
          <p className="p-1 rounded-xl border border-[#F2F0E4]/30">
            connection
          </p>
        </div>
        <div className="h-full">
          <p>{bio}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-['Big']">{formattedDate}</p>
          <p className="bg-black font-['spring'] px-1">{city}</p>
        </div>
      </div>
    </div>
  );
};
