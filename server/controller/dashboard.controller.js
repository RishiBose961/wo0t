import expressAsyncHandler from "express-async-handler";
import Post from "../models/post.model.js";

export const getPostsByUserLike = expressAsyncHandler(async (req, res) => {
  const userId = req.user.id; // Assuming userId is passed as a route parameter
  try {
    const posts = await Post.find({ postedBy: userId }).select(
      "category likeCount descriptions"
    );
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getPostsByUser = expressAsyncHandler(async (req, res) => {
  const userId = req.user.id;
  try {
    const posts = await Post.find({ postedBy: userId });
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const countAllPostTypes = expressAsyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    const posts = await Post.find({ postedBy: userId });
    const NewsCount = await posts.countDocuments({ type: "News" });
    const SportsCount = await posts.countDocuments({ type: "Sports" });
    const PlayCount = await posts.countDocuments({ type: "Play" });
    const ElectionsCount = await posts.countDocuments({ type: "Elections" });
    const MoneyCount = await posts.countDocuments({ type: "Money" });
    const GamingCount = await posts.countDocuments({ type: "Gaming" });
    const WeatherCount = await posts.countDocuments({ type: "Weather" });
    const WatchCount = await posts.countDocuments({ type: "Watch" });
    const LearningCount = await posts.countDocuments({ type: "Learning" });
    const ShoppingCount = await posts.countDocuments({ type: "Shopping" });
    const HealthCount = await posts.countDocuments({ type: "Health" });
    const TravelCount = await posts.countDocuments({ type: "Travel" });
    const TrafficCount = await posts.countDocuments({ type: "Traffic" });
    const AutosCount = await posts.countDocuments({ type: "Autos" });

    res.status(200).json([
      { type: "News", count: NewsCount },
      { type: "Sports", count: SportsCount },
      { type: "Play", count: PlayCount },
      { type: "Elections", count: ElectionsCount },
      { type: "Money", count: MoneyCount },
      { type: "Gaming", count: GamingCount },
      { type: "Weather", count: WeatherCount },
      { type: "Watch", count: WatchCount },
      { type: "Learning", count: LearningCount },
      { type: "Shopping", count: ShoppingCount },
      { type: "Health", count: HealthCount },
      { type: "Travel", count: TravelCount },
      { type: "Traffic", count: TrafficCount },
      { type: "Autos", count: AutosCount },
    ]);
  } catch (error) {
    res.status(500).json(error);
  }
});
