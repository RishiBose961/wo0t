import expressAsyncHandler from "express-async-handler";
import Likey from "../models/likes.model.js";
import Post from "../models/post.model.js";

export const createLikes = expressAsyncHandler(async (req, res) => {
  const userId = req.user.id; // Assuming user is authenticated and ID is available in req.user
  const postId = req.params.postId;

  try {
    if (!userId || !postId) {
      throw new Error("Missing required data");
    }

    const existingLike = await Likey.findOne({ user: userId, post: postId });
    if (existingLike) {
      return res.status(400).json({ message: "User already liked this post" });
    }

    await Promise.all([
      await Likey.create({ user: userId, post: postId }),
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } }),
    ]);

    res.status(201).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error liking post" });
  }
});

export const createunLikes = expressAsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;

  try {
    if (!userId || !postId) {
      throw new Error("Missing required data");
    }

    await Promise.all([
      await Likey.deleteOne({ user: userId, post: postId }),
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } }),
    ]);

    res.json({ message: "Post unliked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error unliking post" });
  }
});

export const findLikesByUserController = expressAsyncHandler(
  async (req, res) => {
    const userId = req.user.id;
    try {
      if (!userId) {
        throw new Error("Missing required data");
      }

      const likes = await Likey.find({ user: userId });
      res.status(200).json(likes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
