import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Post from "@/models/postsModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: Token invalid or missing" },
        { status: 401 },
      );
    }

    const { postId } = await request.json();
    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 },
      );
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const hasLiked = post.likes.some(
      (like: { _id: string }) => like._id.toString() === userId,
    );

    if (hasLiked) {
      // Unlike the post
      post.likes = post.likes.filter(
        (like: { _id: string }) => like._id.toString() !== userId,
      );
    } else {
      // Like the post
      post.likes.push({ _id: userId });
    }

    await post.save();

    return NextResponse.json({ success: true, likes: post.likes.length });
  } catch (error) {
    console.error("Error in like/unlike route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
