import { NextResponse } from "next/server";
import Post from "@/models/postsModel";
import { connect } from "@/dbConfig/dbConfig";

export const GET = async () => {
  try {
    await connect();

    // Fetch all posts and extract unique tags
    const posts = await Post.find({}, "tags");

    const allTags = new Set<string>(); // Explicitly define Set type as string

    posts.forEach((post) => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach((tag: string) => allTags.add(tag));
      }
    });

    return NextResponse.json(Array.from(allTags));
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 },
    );
  }
};
