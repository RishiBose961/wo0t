import expressAsyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.model.js";




export const createPost = expressAsyncHandler(async (req, res) => {
  try {
    const { descriptions, category,visibility, date,scheduledate } = req.body;

    let {sourceurl} = req.body

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
      date,
      visibility,
      sourceurl,
      scheduledate,
      postedBy: req.user.id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" ,error: error.message});
  }
});


export const getPosts = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({
      $or: [
        { visibility: 'public' }
      ]
    }).populate('postedBy', 'name username avatar').sort({ createdAt: -1 });; 
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const getPostIndividual = expressAsyncHandler(async (req, res) => {
  try {
    const { descriptions } = req.params;
    const regex = new RegExp(descriptions, 'i');
    const posts = await Post.find({ descriptions: { $regex: regex } }).populate(
      "postedBy",
      "username name avatar"
    );
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "No posts found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
