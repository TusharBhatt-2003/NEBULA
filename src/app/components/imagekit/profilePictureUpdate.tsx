"use client";

import { IKUpload } from "imagekitio-next";
import { useRef, useState } from "react";

interface ProfileUpdateProps {
  onUploadSuccess: (url: string) => void;
}

export default function ProfilePictureUpdate({
  onUploadSuccess,
}: ProfileUpdateProps) {
  const ikUploadRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const authenticator = async (): Promise<{
    signature: string;
    expire: number;
    token: string;
  }> => {
    try {
      const response = await fetch("http://localhost:3000/api/auth");
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Authentication request failed: ${(error as Error).message}`,
      );
    }
  };

  return (
    <>
      <IKUpload
        ref={ikUploadRef}
        onSuccess={(res: { url: string }) => {
          console.log("Successfully uploaded:", res.url);
          onUploadSuccess(res.url); // Pass the URL to parent
        }}
        validateFile={(file: File) => {
          if (file.size > 1024 * 1024 * 100) {
            alert("File size should be less than 100MB");
            return false;
          }
          return ["image/png", "image/jpeg", "image/gif"].includes(file.type);
        }}
        onUploadProgress={(progress: ProgressEvent) => {
          setProgress(Math.round((progress.loaded / progress.total) * 100));
        }}
        urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT || ""}
        publicKey={process.env.NEXT_PUBLIC_KEY || ""}
        authenticator={authenticator}
        style={{ display: "none" }}
      />
      <div
        onClick={() => ikUploadRef.current?.click()}
        className="font-mono inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 z-[99] light-bg text-black px-3 py-2 cursor-pointer hover:bg-primary/90 hover:text-[#f2f0e4]"
      >
        Upload
      </div>
      {progress > 0 && (
        <div className="relative mt-4 w-full">
          <div className="absolute top-0 left-0 bg-black border border-[#f2f0e4] h-2 w-full rounded-full z-[1]">
            <div
              className="absolute top-0 left-0 bg-[#f2f0e4] h-2 rounded-full z-[1]"
              style={{
                width: `${progress}%`,
                transition: "width 0.3s ease-in-out",
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
