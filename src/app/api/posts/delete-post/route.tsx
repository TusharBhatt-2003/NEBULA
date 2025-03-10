import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Post from "@/models/postsModel";
import { NextRequest, NextResponse } from "next/server";

// Establish database connection
await connect();

export async function DELETE(request: NextRequest) {
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
    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if the user owns the post
    if (post.userId.toString() !== userId) {
      return NextResponse.json(
        { error: "Unauthorized: Cannot delete this post" },
        { status: 403 },
      );
    }

    // Delete the post
    await Post.deleteOne({ _id: postId });

    return NextResponse.json(
      { message: "Post deleted successfully", success: true },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Post deletion error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
