import expressAsyncHandler from "express-async-handler";
import Conversation from "../models/conservation.model.js";
import User from "../models/user.model.js";

export const getConversation = expressAsyncHandler(async (req, res) => {
    try {
      const conversation = await Conversation.find({
        participants: { $in: [req.params.userId] }
      }).sort({ createdAt: -1 });
      res.status(200).json(conversation);
    } catch (error) {
      res.status(500).json(error);
    }
  });


  export const allChatUser = expressAsyncHandler(async (req, res) => {
    const userId = req.query.userId;
    const name = req.query.name;
    try {
      const user = userId
        ? await User.findById(userId).select("username avatar" )
        : await User.findOne({ name: name }).select("username avatar" );
      const { password, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  