import expressAsyncHandler from "express-async-handler";
import Follow from "../models/follow.model.js";
import User from "../models/user.model.js";
import Conversation from "../models/conservation.model.js";

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

    // Create a new conversation
    const newConversation = new Conversation({
      participants: [followerId, followingId],
    });

    await Promise.all([await follow.save(), await newConversation.save()]);

    res.status(201).json({ message: "Successfully followed user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const UnFollowCreate = expressAsyncHandler(async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.id;

    // Check for invalid unfollow attempt
    if (followerId === followingId) {
      return res.status(400).json({ error: "You cannot unfollow yourself" });
    }

    // Fetch users concurrently
    const [follower, following] = await Promise.all([
      User.findById(followerId),
      User.findById(followingId),
    ]);

    // Validate user existence
    if (!follower || !following) {
      return res.status(404).json({ error: "User not found" });
    }

    //delete the conversation with that user
    const newConversation = await Conversation.findOneAndDelete({
      participants: { $all: [followerId, followingId] },
    });

    // Check for existing follow relationship
    const existingFollow = await Follow.findOneAndDelete({
      follower: followerId,
      following: followingId,
    });

    await Promise.all([existingFollow, newConversation]);

    // Handle non-existent relationship
    if (!existingFollow) {
      return res.status(404).json({ error: "You are not following this user" });
    }

    res.status(200).json({ message: "Successfully unfollowed user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const getFollowing = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    const following = await Follow.find({ follower: userId }).populate(
      "following",
      "username avatar"
    );
    res.status(200).json(following);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
