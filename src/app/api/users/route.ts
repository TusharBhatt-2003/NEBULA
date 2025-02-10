import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

// GET all users
export async function GET() {
  try {
    await connect(); // Ensure MongoDB connection

    const users = await User.find(); // Fetch all users from the database

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found." }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users." },
      { status: 500 },
    );
  }
}
