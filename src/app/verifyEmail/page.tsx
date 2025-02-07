"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "../components/loading";
export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl opacity-50 font-semibold">Email Verification</h1>
      {/* <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2> */}

      {loading ? (
        <Loading />
      ) : (
        <>
          {verified && (
            <div>
              <h2 className="text-2xl">Email Verified</h2>
              <Link
                className="py-2 px-4 rounded-lg btnBgColor border-2 border-black"
                href="/login"
              >
                Login
              </Link>
            </div>
          )}
          {error && (
            <div>
              <h2 className="text-2xl text-red-500">Link expired</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}
