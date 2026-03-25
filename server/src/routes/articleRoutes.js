import express from "express";
import { body } from "express-validator";
import {
  createArticle,
  getArticles,
  getArticleById,
  getPendingArticles,
  updateArticleStatus
} from "../controllers/articleController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getArticles);
router.get("/:id", getArticleById);

// User-submitted articles (any authenticated user)
router.post(
  "/",
  protect,
  [
    body("title").trim().escape().notEmpty().withMessage("Title required"),
    body("content").trim().escape().notEmpty().withMessage("Content required"),
    body("category").isIn(["PHISHING", "SCAM", "PRIVACY", "GENERAL"]).withMessage("Invalid category")
  ],
  createArticle
);

// Admin only - pending articles and status updates
router.get("/admin/pending", protect, adminOnly, getPendingArticles);
router.put("/:id/status", protect, adminOnly, updateArticleStatus);

export default router;
