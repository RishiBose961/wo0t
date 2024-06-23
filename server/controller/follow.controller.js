import expressAsyncHandler from "express-async-handler";
import Follow from "../models/follow.model.js";
import User from "../models/user.model.js";


export const FollowCreate = expressAsyncHandler(async (req, res) => {
    try {
      const followerId = req.user.id; // Assuming you have user authentication middleware
      const followingId = req.params.id; // User to follow
  
      // Check if the user is trying to follow themselves
      if (followerId === followingId) {
        return res.status(400).json({ error: "You cannot follow yourself" });
      }
  
      // Check if both users exist
      const [follower, following] = await Promise.all([
        User.findById(followerId),
        User.findById(followingId),
      ]);
  
      if (!follower || !following) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the follow relationship already exists
      const existingFollow = await Follow.findOne({
        follower: followerId,
        following: followingId,
      });
  
      if (existingFollow) {
        return res
          .status(400)
          .json({ error: "You are already following this user" });
      }
  
      // Create a new follow relationship
      const follow = new Follow({
        follower: followerId,
        following: followingId,
      });
  
      await follow.save();
  
      res.status(201).json({ message: "Successfully followed user", follow });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });