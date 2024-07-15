import expressAsyncHandler from "express-async-handler";
import Post from "../models/post.model.js";

export const getPostsByUserLike = expressAsyncHandler(async (req, res) => {
    const userId = req.user.id; // Assuming userId is passed as a route parameter
    try {
      const posts = await Post.find({ postedBy: userId }).select("category likeCount descriptions");
      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: "No posts found for this user" });
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  export const getPostsByUser = expressAsyncHandler(async (req, res) => {
    const userId = req.user.id;
    try {
      const posts = await Post.find({ postedBy: userId })
      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: "No posts found for this user" });
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });