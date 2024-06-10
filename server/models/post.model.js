import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    descriptions: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      required: true,
    },
    uniqueId:{
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: () => new Date(),
    },
    time: {
      type: String,
    },
    sourceurl: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
