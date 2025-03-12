import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      userId,
      fullName,
      username,
      email,
      password,
      profileUrl,
      gender,
      bio,
      city,
    } = reqBody;

    console.log("Update Body", reqBody);

    // Find user by ID
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (profileUrl) user.profileUrl = profileUrl;
    if (gender) user.gender = gender;
    if (bio) user.bio = bio;
    if (city) user.city = city;
    if (fullName) user.fullName = fullName;

    // Hash new password if provided
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(password, salt);
    }

    const updatedUser = await user.save();
    console.log("Updated user", updatedUser);

    return NextResponse.json({
      message: "User updated successfully",
      success: true,
      updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
