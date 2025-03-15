import { NextResponse } from "next/server";
import Post from "@/models/postsModel";
import User from "@/models/userModel"; // Import the User model
import { connect } from "@/dbConfig/dbConfig";

interface Author {
  username: string;
  profileUrl?: string; // Mark as optional if it's not always present
}

// GET all posts with user information
export async function GET() {
  try {
    await connect(); // Ensure MongoDB connection

    const posts = await Post.find(); // Fetch all posts from the database

    if (posts.length === 0) {
      return NextResponse.json({ message: "No posts found." }, { status: 404 });
    }

    // Fetch author details for each post
    const postsWithUsers = await Promise.all(
      posts.map(async (post) => {
        const author = (await User.findById(post.userId)
          .select("username profileUrl")
          .lean()) as Author | null;
        return {
          ...post.toObject(),
          author: author || null, // Attach user info to the post
        };
      }),
    );

    return NextResponse.json(postsWithUsers, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts." },
      { status: 500 },
    );
  }
}
