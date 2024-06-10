import expressAsyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.model.js";
import { v4 as uuidv4 } from 'uuid';



export const createPost = expressAsyncHandler(async (req, res) => {
  try {
    const { descriptions, category,visibility, date, time } = req.body;

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
      uniqueId:uuidv4(),
      sourceurl,
      time,
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
    }).populate('postedBy', 'name username').sort({ createdAt: -1 });; 
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});