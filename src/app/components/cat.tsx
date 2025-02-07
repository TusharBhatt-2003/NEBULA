import Image from "next/image";

export default function Cat() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="https://i.pinimg.com/originals/8e/ad/ad/8eadadee40496b454d5df3e3fea5c277.gif" // Replace with any cat GIF URL
        alt="Funny Cat GIF"
        width={300}
        height={300}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}
