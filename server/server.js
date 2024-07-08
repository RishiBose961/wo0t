import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
// error handling
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { v2 as cloudinary } from "cloudinary";
// routes
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import likeRoutes from "./routes/likes.routes.js";
import commentRoutes from "./routes/comments.routes.js";
import followRoutes from "./routes/follow.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/message.routes.js";
import liveRoutes from "./routes/livechat.routes.js";

import { app, server } from "./socket/socket.js";

//db connections
import connectDB from "./config/db.config.js";

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/li", likeRoutes);
app.use("/api/c", commentRoutes);
app.use("/api/f", followRoutes);
app.use("/api/c", conversationRoutes);
app.use("/api/m", messageRoutes);
app.use("/api/l", liveRoutes);
app.get("/", (req, res) => res.send("server is ready"));

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(notFound);
app.use(errorHandler);

server.listen(port, () => console.log(`server is Running at ${port}`));
