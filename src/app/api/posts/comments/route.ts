import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Post from "@/models/postsModel";
import User from "@/models/userModel"; // Import the User model
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    const { postId, text, parentCommentId } = reqBody;

    if (!text?.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const user = await User.findById(userId).select("username profileUrl");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const trimmedText = text.trim();

    if (!parentCommentId) {
      // New comment
      const newComment = {
        userId: user._id,
        username: user.username,
        profileUrl: user.profileUrl,
        text: trimmedText,
        createdAt: new Date(),
        replies: [],
      };

      post.comments.push(newComment);
      await post.save();

      return NextResponse.json(
        { message: "Comment added", success: true, updatedPost: post },
        { status: 201 },
      );
    } else {
      // Reply to existing comment
      const comment = post.comments.id(parentCommentId);
      if (!comment) {
        return NextResponse.json(
          { error: "Parent comment not found" },
          { status: 404 },
        );
      }

      const newReply = {
        userId: user._id,
        username: user.username,
        profileUrl: user.profileUrl,
        text: trimmedText,
        createdAt: new Date(),
      };

      comment.replies.push(newReply);
      await post.save();

      return NextResponse.json(
        { message: "Reply added", success: true, updatedPost: post },
        { status: 201 },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
