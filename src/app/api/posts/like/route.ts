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

    const { postId } = reqBody;
    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 },
      );
    }

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if the user has already liked the post
    const hasLiked = post.likes.some(
      (like: { _id: string }) => like._id === userId,
    );

    if (hasLiked) {
      // Unlike the post
      post.likes = post.likes.filter(
        (like: { _id: string }) => like._id !== userId,
      );
    } else {
      // Like the post
      post.likes.push({ _id: userId }); // Ensure it's an object
    }

    await post.save();

    return NextResponse.json(
      {
        message: hasLiked ? "Post unliked" : "Post liked",
        success: true,
        likes: post.likes,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error handling like request:", error);

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
