import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Post from "@/models/postsModel";
import { NextRequest, NextResponse } from "next/server";

// Establish database connection
await connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log("Extracted userId:", userId);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: Token invalid or missing" },
        { status: 401 },
      );
    }

    const reqBody = await request.json();
    console.log("Request Body:", reqBody);

    const { text } = reqBody;

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Create a new post
    const newPost = new Post({
      user: userId,
      content: text.trim(), // Trimmed for safety
    });

    console.log("New Post Object:", newPost);

    const savedPost = await newPost.save();
    console.log("Saved Post:", savedPost);

    return NextResponse.json(
      {
        message: "Post created successfully",
        success: true,
        savedPost,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Post creation error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
