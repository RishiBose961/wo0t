import mongoose from "mongoose";

const likesSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  },
  {
    timestamps: true,
  }
);

const Likey = mongoose.model("Likey", likesSchema);

export default Likey;
