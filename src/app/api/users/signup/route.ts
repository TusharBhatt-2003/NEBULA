import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      fullName,
      username,
      email,
      password,
      profileUrl,
      gender,
      city,
      birthday,
    } = reqBody;

    console.log("Body", reqBody);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const isAdmin = email === "tu8700475433@gmail.com";

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      profileUrl,
      gender,
      city,
      birthday: new Date(birthday),
      isAdmin,
    });

    const savedUser = await newUser.save();
    console.log("Saved user", savedUser);

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // --- Log the user in (generate token) ---
    const tokenData = {
      id: savedUser._id,
      email: savedUser.email,
      username: savedUser.username,
      profileUrl: savedUser.profileUrl,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "30d",
    });

    const response = NextResponse.json({
      message: "User created and logged in successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
