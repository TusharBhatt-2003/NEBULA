import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Post from "@/models/postsModel";
import { NextRequest, NextResponse } from "next/server";

// Establish database connection
connect();

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

    // Map `text` to `content` and `userId` to `user`
    const newPost = new Post({
      user: userId, // Map userId to user
      content: text, // Map text to content
    });
    console.log("New Post Object:", newPost);

    const savedPost = await newPost.save();
    console.log("Saved Post:", savedPost);

    if (!savedPost) {
      throw new Error("Failed to save post");
    }

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

    if (error.name === "ValidationError") {
      console.error("Validation Errors:", error.errors);
    }

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
