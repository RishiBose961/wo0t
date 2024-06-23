import mongoose from "mongoose";
const commentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    commentext: { type: String, required: true },
    pinned: { type: Boolean, default: false } 
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;