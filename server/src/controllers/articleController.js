import Article from "../models/Article.js";
import { validationResult } from "express-validator";
import Notification from "../models/Notification.js";

// Create Article (Any authenticated user)
export const createArticle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, category } = req.body;

    const article = await Article.create({
      title,
      content,
      category,
      createdBy: req.user._id,
      status: "PENDING"
    });

    await Notification.create({
      message: "New article submitted for review",
      type: "ARTICLE"
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Approved Articles (Public)
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "APPROVED" })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Article
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("createdBy", "name");

    if (!article || (article.status !== "APPROVED")) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Pending Articles (Admin only)
export const getPendingArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "PENDING" })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Article Status (Admin only)
export const updateArticleStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.status = status;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
