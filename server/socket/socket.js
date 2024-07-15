import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverScoketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; //{userId.SocketId}

io.on("connection", (socket) => {
  console.log("a userConnected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId != "undefined") userSocketMap[userId] = socket.id;

  //io.emit()  is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("message", (data) => {
    io.emit("receive-message", data);
    // console.log(data);
  });

  // socket.on("typing", (isTyping) => {
  //   // Exclude the sender from receiving the 'userTyping' event
  //   socket.broadcast.emit("userTyping", isTyping);
  // });


  socket.on("typing", (isTyping, targetUserId, conversationId) => {
    const targetSocketId = getReceiverScoketId(targetUserId);
    io.to(targetSocketId).emit("userTyping", { isTyping, conversationId });
});
  
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
