import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Post from "@/models/postsModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(request: NextRequest) {
  try {
    await connect();

    const userData = await getDataFromToken(request);
    const userId = userData._id;
    const isAdmin = userData.isAdmin;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId, commentId } = await request.json();

    if (
      !mongoose.Types.ObjectId.isValid(postId) ||
      !mongoose.Types.ObjectId.isValid(commentId)
    ) {
      return NextResponse.json(
        { error: "Invalid postId or commentId" },
        { status: 400 },
      );
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.userId.toString() !== userId && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    post.comments = post.comments.filter(
      (c: any) => c._id.toString() !== commentId,
    );

    await post.save();

    return NextResponse.json(
      { message: "Comment deleted", success: true, updatedPost: post },
      { status: 200 },
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
