import expressAsyncHandler from "express-async-handler";
import Comment from "../models/comment.model.js";

export const createComments = expressAsyncHandler(async (req, res) => {
  const { commentext, pinned } = req.body;

  try {
    // Create a new comment
    const newComment = new Comment({
      postId: req.params.postId,
      userId: req.user.id,
      commentext,
      pinned,
    });

    // Save the comment to the database
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export const getCommentsByPostId = expressAsyncHandler(async (req, res) => {
  const { postId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;

  try {
    const comments = await Comment.find({ postId })
      .populate("userId", "username avatar");

    // Sort comments with pinned comments at the top:
    const sortedComments = comments.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

    const pinnedComments = sortedComments.filter((comment) => comment.pinned);
    const unpinnedComments = sortedComments.filter((comment) => !comment.pinned);

    // Combine pinned and unpinned comments, ensuring no duplicates:
    const uniqueComments = [...new Set([...pinnedComments, ...unpinnedComments])];

    // Apply pagination:
    const totalComments = uniqueComments.length;
    const totalPages = Math.ceil(totalComments / limit);

    let currentComments;
    if (page === 1) {
      currentComments = uniqueComments.slice(0, limit);
    } else {
      currentComments = uniqueComments.slice((page - 1) * limit, page * limit);
    }

    res.status(200).json({ currentComments, totalPages, currentPage: page, totalComments });

  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const getCountCommentPostId = expressAsyncHandler(async (req, res) => {
  
  const { postId } = req.params;
  try {
    const count = await Comment.countDocuments({ postId });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})



