import { NextResponse } from "next/server";
import Post from "@/models/postsModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(req: Request) {
  try {
    await connect();

    const url = new URL(req.url);
    const tagsParam = url.searchParams.get("tags");

    if (!tagsParam) {
      return NextResponse.json(
        { message: "No tags provided." },
        { status: 400 },
      );
    }

    const tagsArray = tagsParam
      .split(",")
      .map((tag) => tag.trim().toLowerCase()); // Normalize tags

    const postsWithAuthors = await Post.aggregate([
      { $match: { tags: { $in: tagsArray } } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users", // Must match your MongoDB collection name exactly
          localField: "userId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true, // Keep posts even if author not found
        },
      },
      {
        $project: {
          text: 1,
          image: 1,
          likes: 1,
          tags: 1,
          userId: 1,
          createdAt: 1,
          updatedAt: 1,
          "author.username": 1,
          "author.profileUrl": 1,
        },
      },
    ]);

    if (postsWithAuthors.length === 0) {
      return NextResponse.json(
        { message: "No posts found for the given tags." },
        { status: 404 },
      );
    }

    return NextResponse.json(postsWithAuthors, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts." },
      { status: 500 },
    );
  }
}
