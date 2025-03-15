import { NextResponse } from "next/server";
import Post from "@/models/postsModel";
import User from "@/models/userModel"; // Import the User model
import { connect } from "@/dbConfig/dbConfig";

interface Author {
  username: string;
  profileUrl?: string; // Mark as optional if it's not always present
}

// GET only followed tag posts
export async function GET(req: Request) {
  try {
    await connect(); // Ensure MongoDB connection

    // Get search params from the request URL
    const url = new URL(req.url);
    const tagsParam = url.searchParams.get("tags");

    if (!tagsParam) {
      return NextResponse.json(
        { message: "No tags provided." },
        { status: 400 },
      );
    }

    const tagsArray = tagsParam.split(",");

    const posts = await Post.find({ tags: { $in: tagsArray } })
      .sort({ createdAt: -1 })
      .lean(); // Use `.lean()` for better performance

    if (posts.length === 0) {
      return NextResponse.json(
        { message: "No posts found for the given tags." },
        { status: 404 },
      );
    }

    // Fetch author details for each post
    const postWithAuthors = await Promise.all(
      posts.map(async (post) => {
        const author = (await User.findById(post.userId)
          .select("username profileUrl")
          .lean()) as Author | null;
        return {
          ...post,
          author: author || null, // Ensure proper typing
        };
      }),
    );

    return NextResponse.json(postWithAuthors, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts." },
      { status: 500 },
    );
  }
}
