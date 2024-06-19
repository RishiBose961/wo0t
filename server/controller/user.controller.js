import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import mongoose from "mongoose";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const validateEmail = async (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/;
    return await emailRegex.test(email);
  };

  if (!validateEmail(email)) {
    res.status(400);
    throw new Error("Invalid email");
  }

  const user = await User.create({
    username: `@${name}${crypto.randomInt(0, 10000)}`,
    name,
    avatar: `https://api.dicebear.com/8.x/notionists/svg?seed=${name}`,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      message: "User created successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

export const getUserProfileSearch = expressAsyncHandler(async (req, res) => {
  const { query } = req.params;

  try {
    let user;

    // query is userId
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select("-password")
        .select("-updatedAt");
    } else {
      // query is username
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-updatedAt");
    }

    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in getUserProfile: ", err.message);
  }
});

export const logoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout out" });
});
