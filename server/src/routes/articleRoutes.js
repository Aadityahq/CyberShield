import express from "express";
import {
  createArticle,
  getArticles,
  getArticleById
} from "../controllers/articleController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getArticles);
router.get("/:id", getArticleById);

// Admin only
router.post("/", protect, adminOnly, createArticle);

export default router;
