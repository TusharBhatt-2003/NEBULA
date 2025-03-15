import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Post from "@/models/postsModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    const { text, image, tags } = reqBody;

    if (!text.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const newPost = new Post({
      userId,
      text: text.trim(),
      image: image || null,
      tags: tags?.length ? tags.map((tag: string) => tag.trim()) : [],
    });

    const savedPost = await newPost.save();
    return NextResponse.json(
      { message: "Post created", success: true, savedPost },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
