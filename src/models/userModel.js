import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    index: true,
  },
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email address"],
    unique: true,
    lowecase: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  profileUrl: {
    type: String,
    default:
      "https://i.pinimg.com/736x/1a/bb/12/1abb12125ce51b432f17fda64def85e5.jpg",
    required: false,
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,

  // Adding new fields
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // You can modify or add more options if needed
    required: false,
  },
  bio: {
    type: String,
    default: "", // Default to an empty string if bio is not provided
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
