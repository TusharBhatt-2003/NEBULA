import User from "@/models/userModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json(); // Get userId from the request body

    // Validate the userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Attempt to delete the user by userId
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the user" },
      { status: 500 },
    );
  }
}
