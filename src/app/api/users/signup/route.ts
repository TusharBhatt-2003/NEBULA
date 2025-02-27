import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { uploadOnCloudinary } from "@/utils/cloudinary";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, profileUrl, gender, bio, city } =
      reqBody;

    console.log("Body", reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Upload profile image to Cloudinary if provided
    let uploadedProfileUrl = "";
    if (profileUrl) {
      const uploadResponse = await uploadOnCloudinary(profileUrl);
      if (uploadResponse) {
        uploadedProfileUrl = uploadResponse.secure_url;
      }
    }

    // Set isAdmin to true if email matches the specified one
    const isAdmin = email === "tu8700475433@gmail.com";

    // Create a new user with additional fields (gender, bio, city)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profileUrl: uploadedProfileUrl,
      gender,
      bio,
      city,
      isAdmin,
    });

    const savedUser = await newUser.save();
    console.log("Saved user", savedUser);

    // Send verification email
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
