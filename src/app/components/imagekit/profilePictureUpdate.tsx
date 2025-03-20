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
      const response = await fetch("api/auth");
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
        className="font-mono inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 z-[99] light-bg text-black px-3 py-2 cursor-pointer hover:bg-primary/90 hover:text-[#f2f0e4]"
      >
        <svg
          fill="#000000"
          width="256px"
          height="256px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>image</title>{" "}
            <path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM6.016 24q0 0.832 0.576 1.44t1.408 0.576h16q0.832 0 1.408-0.576t0.608-1.44v-0.928q-0.224-0.448-1.12-2.688t-1.6-3.584-1.28-2.112q-0.544-0.576-1.12-0.608t-1.152 0.384-1.152 1.12-1.184 1.568-1.152 1.696-1.152 1.6-1.088 1.184-1.088 0.448q-0.576 0-1.664-1.44-0.16-0.192-0.48-0.608-1.12-1.504-1.6-1.824-0.768-0.512-1.184 0.352-0.224 0.512-0.928 2.24t-1.056 2.56v0.64zM6.016 9.024q0 1.248 0.864 2.112t2.112 0.864 2.144-0.864 0.864-2.112-0.864-2.144-2.144-0.864-2.112 0.864-0.864 2.144z"></path>{" "}
          </g>
        </svg>
      </div>
      {progress > 0 && (
        <div className="relative mt-4 w-full">
          <div className="absolute top-0 left-0 bg-black border border-[#f2f0e4] h-2 w-full rounded-full z-[1]">
            <div
              className={`absolute top-0 left-0 h-2 rounded-full z-[1] transition-all duration-300 ease-in-out ${
                progress === 100 ? "bg-green-500" : "bg-[#f2f0e4]/60"
              }`}
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
