import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        text: {
          type: String,
          required: true,
          trim: true,
        },
        replies: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "users",
              required: true,
            },
            text: {
              type: String,
              required: true,
              trim: true,
            },
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
