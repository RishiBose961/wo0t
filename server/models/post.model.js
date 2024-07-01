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
    commentshow:{
      type: Boolean,
      default:false,
    },
    visibility: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: () => new Date(),
    },
    scheduledate:{
      type: String,
    },
    sourceurl: {
      type: String,
    },
    likeCount:{
      type: Number,
      default: 0,
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
