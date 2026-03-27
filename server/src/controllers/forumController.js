import ForumPost from "../models/ForumPost.js";

export const createPost = async (req, res) => {
  try {
    const post = await ForumPost.create({
      user: req.user._id,
      title: req.body.title,
      content: req.body.content
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReply = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.replies.push({
      user: req.user._id,
      text: req.body.text
    });

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .populate("user", "name")
      .populate("replies.user", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
