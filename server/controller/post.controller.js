import expressAsyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.model.js";
import mongoose from "mongoose";
import puppeteer from "puppeteer";

export const createPost = expressAsyncHandler(async (req, res) => {
  try {
    const {
      descriptions,
      commentshow,
      category,
      visibility,
      date,
      scheduledate,
    } = req.body;

    let { sourceurl } = req.body;

    if (!descriptions || !category || !visibility) {
      return res.status(402).json({ error: "Please add all the fields" });
    }

    if (sourceurl) {
      const uploadedResponse = await cloudinary.uploader.upload(sourceurl);
      sourceurl = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      descriptions,
      category,
      commentshow,
      date,
      visibility,
      sourceurl,
      scheduledate,
      postedBy: req.user.id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", error: error.message });
  }
});

export const getPosts = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({
      $or: [{ visibility: "public" }],
    })
      .populate("postedBy", "name username avatar")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getPostById = expressAsyncHandler(async (req, res) => {
  try {
    // Extract the ID from request parameters (ensure it's a valid ID)
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Fetch the post using findById with population
    const post = await Post.findById(id).populate(
      "postedBy",
      "username name avatar" // Specific fields to populate
    );

    // Handle successful retrieval
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PROD_CONFIG = {
  headless: true,
  ignoreHTTPSErrors: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  ignoreDefaultArgs: ["--disable-extensions"],
};

export const miningTitle = expressAsyncHandler(async (req, res) => {
  const { Titlegenbody } = req.body;
  try {
    const browser = await puppeteer.launch(PROD_CONFIG);
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto(Titlegenbody);

    const content = await page.title();

    res.status(200).json(content);

    await browser.close();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const showReleatedPosts = expressAsyncHandler(async (req, res) => {
  const { category, postId } = req.params;
  const regex = new RegExp(category, "i");

  try {
    const posts = await Post.find({
      category: { $regex: regex },
      _id: { $ne: postId }, // Exclude the post with the given ID
    }).select("category descriptions sourceurl postedBy createdAt");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getPostsByUser = expressAsyncHandler(async (req, res) => {
  const userId = req.user.id; // Assuming userId is passed as a route parameter
  try {
    const posts = await Post.find({ postedBy: userId });
    // if (!posts || posts.length === 0) {
    //   return res.status(404).json({ message: "No posts found for this user" });
    // }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
