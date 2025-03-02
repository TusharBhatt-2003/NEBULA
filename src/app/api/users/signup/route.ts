import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

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

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
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
      birthday: new Date(birthday), // Ensure birthday is stored as a Date object
      isAdmin,
    });

    const savedUser = await newUser.save();
    console.log("Saved user", savedUser);

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
