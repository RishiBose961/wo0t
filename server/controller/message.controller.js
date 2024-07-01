import expressAsyncHandler from "express-async-handler";
import Message from "../models/message.model.js";
import { getReceiverScoketId, io } from "../socket/socket.js";
import Conversation from "../models/conservation.model.js";

export const sendMessage = expressAsyncHandler(async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!message || !conversationId) {
      return res.status(500).json({ message: "Please Fill All Fields" });
    }

    const newMessage = new Message({
      senderId,
      conversationId,
      receiverId,
      message,
    });

    await newMessage.save();

    const receiverScoketId = getReceiverScoketId(receiverId);
    console.log(receiverScoketId);
    if (receiverScoketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverScoketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getMessage = expressAsyncHandler(async (req, res) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
});
