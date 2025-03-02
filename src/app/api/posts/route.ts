import { NextResponse } from "next/server";
import Post from "@/models/postsModel";
import { connect } from "@/dbConfig/dbConfig";

// GET all users
export async function GET() {
  try {
    await connect(); // Ensure MongoDB connection

    const users = await Post.find(); // Fetch all users from the database

    if (users.length === 0) {
      return NextResponse.json({ message: "No post found." }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts." },
      { status: 500 },
    );
  }
}
