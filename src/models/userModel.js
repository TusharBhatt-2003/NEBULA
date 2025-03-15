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
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  profileUrl: {
    type: String,
    default:
      "https://i.pinimg.com/736x/1a/bb/12/1abb12125ce51b432f17fda64def85e5.jpg",
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

  // New fields
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  bio: {
    type: String,
    default: "",
  },
  city: {
    type: String,
  },
  birthday: {
    type: Date,
    required: true,
  },

  // New field for following tags
  followingTags: {
    type: [String], // Array of tag names
    default: [], // Empty array by default
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
