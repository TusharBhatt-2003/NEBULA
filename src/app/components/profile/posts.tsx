interface PostProps {
  posts: { content: string }[];
}
export const Post = ({ posts }: PostProps) => {
  return (
    <div className="border-t-2 border-[#f2f0e4]">
      <h1 className="font-['spring'] light-text border-b w-fit">POSTS:</h1>
      {posts.map((post, index) => (
        <div key={index} className="p-3 border-b border-[#f2f0e4]">
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};
