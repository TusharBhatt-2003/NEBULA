"use client";

const GrainContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`overflow-hidden m-5 mb-0 border-[#F2F0E4]/30 z-10 backdrop-blur-[2px] p-3 light-text border rounded-3xl text-center text-light text-lg relative ${className}`}
    >
      <div className="grain"></div>
      {children}
    </div>
  );
};

export default GrainContainer;
