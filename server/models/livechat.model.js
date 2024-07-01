import mongoose from "mongoose";
const livechatSchema = mongoose.Schema(
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
    livecommtext: { type: String, required: true },

    ttl_expiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

livechatSchema.index({ ttl_expiry: 1 }, { expireAfterSeconds: 0 });

const LiveChat = mongoose.model("LiveChat", livechatSchema);

export default LiveChat;
