import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    replies: [
      {
        userName: {
          type: String,
          required: true,
        },
        commentId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        reply: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: new Date().getTime(),
        },
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", commentSchema);

export default Comment;
