"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  fullName: string;
  profileUrl: string;
  email: string;
  _id: string;
  bio: string;
  username: string;
  isAdmin: boolean;
  isverified: boolean;
  gender: string;
  city: string;
  posts: { content: string }[];
  birthday: string;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get<{ data: User }>("/api/users/me");
        setUser(res.data.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return { user, loading };
}
