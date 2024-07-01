import expressAsyncHandler from "express-async-handler";
import LiveChat from "../models/livechat.model.js";
import { io } from "../socket/socket.js";


export const createLiveChat = expressAsyncHandler(async (req, res) => {
    const { livecommtext } = req.body;
  
    try {
      // Create a new comment
      const newliveComment = new LiveChat({
        postId: req.params.postId,
        userId: req.user.id,
        livecommtext,

        ttl_expiry: new Date(
          Date.now() + process.env.TTL_EXPIRE * 60 * 60 * 1000
        ),
      });
  
      // Save the comment to the database
      await newliveComment.save();

      io.emit("newliveComment", newliveComment);
  
      // socket.on("message",(data)=>{
        // console.log(data);
      // })
      res.status(201).json(newliveComment);
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  export const getLiveChatByPostId = expressAsyncHandler(async (req, res) => {
    const { postId } = req.params;

  
    try {
      const comments = await LiveChat.find({ postId })

  

      res.status(200).json(comments);
  
    } catch (error) {
      console.error("Error getting comments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });