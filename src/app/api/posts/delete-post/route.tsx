import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Post from "@/models/postsModel";
import { NextRequest, NextResponse } from "next/server";

await connect();

export async function DELETE(request: NextRequest) {
  try {
    const user = await getDataFromToken(request);

    if (!user?._id) {
      return NextResponse.json(
        { error: "Unauthorized: Token invalid or missing" },
        { status: 401 },
      );
    }

    const { _id: userId, isAdmin } = user;

    const reqBody = await request.json();
    const { postId } = reqBody;

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 },
      );
    }

    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const isOwner = post.userId.toString() === userId.toString();

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized: Cannot delete this post" },
        { status: 403 },
      );
    }

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
