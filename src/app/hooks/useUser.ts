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
  followingTags: string[];
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch user details
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

  // Function to refresh user data
  const refreshUser = async () => {
    setLoading(true);
    await fetchUserDetails(); // Re-fetch user details
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return { user, loading, refreshUser };
}
