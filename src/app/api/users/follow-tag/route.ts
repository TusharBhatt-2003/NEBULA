import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, tag } = reqBody;

    if (!userId || !tag) {
      return NextResponse.json(
        { error: "User ID and tag are required" },
        { status: 400 },
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isFollowing = user.followingTags.includes(tag);

    if (isFollowing) {
      user.followingTags = user.followingTags.filter((t: string) => t !== tag);
    } else {
      user.followingTags.push(tag);
    }

    await user.save();

    return NextResponse.json({
      message: isFollowing ? "Tag unfollowed" : "Tag followed",
      followingTags: user.followingTags,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
