import React from "react";
import Link from "next/link";

interface TagLinkProps {
  tag: string;
  index: number;
}

const TagLink: React.FC<TagLinkProps> = ({ tag, index }) => {
  return (
    <Link
      key={index}
      href={`/tag/${tag}`}
      className="flex justify-center items-center"
    >
      <p className="light-bg z-[99] text-black font-bold px-2 pb-1 rounded-xl text-sm">
        {tag}
      </p>
    </Link>
  );
};

export default TagLink;
