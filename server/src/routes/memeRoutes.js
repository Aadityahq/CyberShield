import express from "express";
import rateLimit from "express-rate-limit";
import { body } from "express-validator";
import {
  createMeme,
  getFlaggedMemes,
  getMemes,
  updateMeme,
  voteMeme
} from "../controllers/memeController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadImageOnly } from "../middlewares/uploadMiddleware.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";

const router = express.Router();

const voteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many vote attempts. Please try again later."
  }
});

router.post(
  "/",
  protect,
  uploadImageOnly.single("image"),
  [
    body("caption").trim().escape().notEmpty().withMessage("Caption is required"),
    body("category").optional().isIn(["SCAM", "AWARENESS", "FUN"]).withMessage("Invalid category")
  ],
  createMeme
);

router.get("/", getMemes);

router.post(
  "/:id/vote",
  protect,
  voteLimiter,
  [body("type").isIn(["up", "down"]).withMessage("Invalid vote type")],
  voteMeme
);

router.get("/admin/flagged", protect, adminOnly, getFlaggedMemes);

router.put(
  "/:id",
  protect,
  adminOnly,
  [
    body("status").optional().isIn(["VISIBLE", "FLAGGED", "REMOVED"]).withMessage("Invalid status"),
    body("votingEnabled").optional().isBoolean().toBoolean().withMessage("Invalid voting flag"),
    body("commentsEnabled").optional().isBoolean().toBoolean().withMessage("Invalid comments flag")
  ],
  updateMeme
);

export default router;